import { HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse, PaginationData } from 'src/model/BaseResponse.model';
import { PkmRequest, pkm } from 'src/model/Pkm.model';
import { PkmValidation } from './pkm.validation';
import { uploadFile } from 'src/utils/fileUploadBucket';

@Injectable()
export class PkmService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getListPkm(
    account: Account,
    page: number = 1,
  ): Promise<BaseResponse<pkm[]>> {
    try {
      const dosen = await this.prismaService.dosenAccount.findFirst({
        where: {
          account_id: account.uuid,
        },
        include: {
          dosen: {},
        },
      });

      const semesterActive = await this.prismaService.semesterAktif.findFirst({
        where: {
          status: 'active',
        },
      });
      const totalCount = await this.prismaService.pKM.count({
        where: {
          semesterAktif: semesterActive.id,
        },
      });
      const totalPages = Math.ceil(totalCount / 10);
      const pkmList = await this.prismaService.pKM.findMany({
        take: 10,
        skip: (page - 1) * 10,
        where: {
          AND: [
            {
              semesterAktif: semesterActive.id,
            },
            { nidn: dosen.nidn },
          ],
        },
      });

      const pkmResponse: pkm[] = pkmList.map((pkm) => ({
        id: pkm.id,
        NIDN: pkm.nidn,
        judul: pkm.judul,
        lama_kegiatan: pkm.lama_kegiatan,
        lokasi_kegiatan: pkm.lokasi_kegiatan,
        nomor_sk_pengesahan: pkm.nomor_sk_pengesahan,
        semesterAktif: semesterActive.semester,
        tahun_pelaksanaan: pkm.tahun_pelaksanaan,
        upload_document: pkm.upload_document,
      }));
      const PaginationData: PaginationData = {
        page,
        size: 10,
        total_data: totalCount,
        total_page: totalPages,
      };
      return {
        data: pkmResponse,
        pagination: PaginationData,
        status_code: HttpStatus.OK,
        message: 'succes get list pkm',
      };
    } catch (error) {}
  }

  async createPkm(
    account: Account,
    request: PkmRequest,
    document: Express.Multer.File,
  ): Promise<BaseResponse<string>> {
    try {
      const dosen = await this.prismaService.dosenAccount.findFirst({
        where: {
          account_id: account.uuid,
        },
      });

      const pkmRequest: PkmRequest = this.validationService.validate(
        PkmValidation.PKM_SCHEMA,
        request,
      );

      const semesterActive = await this.prismaService.semesterAktif.findFirst({
        where: {
          status: 'active',
        },
      });
      const fileUrl = await uploadFile(document);
      await this.prismaService.pKM.create({
        data: {
          judul: pkmRequest.judul,
          lama_kegiatan: pkmRequest.lama_kegiatan,
          lokasi_kegiatan: pkmRequest.lokasi_kegiatan,
          nomor_sk_pengesahan: pkmRequest.nomor_sk_pengesahan,
          tahun_pelaksanaan: pkmRequest.tahun_pelaksanaan,
          upload_document: fileUrl,
          nidn: dosen.nidn,
          semesterAktif: semesterActive.id,
        },
      });

      return {
        status_code: HttpStatus.CREATED,
        message: 'create pkm success',
      };
    } catch (error) {
      return {
        status_code: 500,
        message: `server error: ${error}`,
      };
    }
  }
}
