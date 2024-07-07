import { HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse, PaginationData } from 'src/model/BaseResponse.model';
import { pkm } from 'src/model/Pkm.model';

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
}
