import { HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { DosenProfile } from 'src/model/Dosen.model';
import { DosenProfileValidation } from './dosen-profile.validate';

@Injectable()
export class DosenProfileService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getProfile(account: Account): Promise<BaseResponse<DosenProfile>> {
    try {
      const dosenAccount = await this.prismaService.dosenAccount.findFirst({
        where: {
          account_id: account.uuid,
        },
        include: {
          dosen: {},
        },
      });

      return {
        status_code: HttpStatus.OK,
        message: 'get dosen profile success',
        data: {
          nidn: dosenAccount.dosen.nidn,
          nama: dosenAccount.dosen.nama,
          alamatSurel: dosenAccount.dosen.alamat_surel,
          jabatanAkademik: dosenAccount.dosen.jabatan_akademik,
          jenisKelamin: dosenAccount.dosen.jenis_kelamin,
          jenjangPendidikan: dosenAccount.dosen.jenjang_pendidikan,
          tanggalLahir: dosenAccount.dosen.tanggal_lahir,
          noTelephone: dosenAccount.dosen.no_telephone,
          programStudi: dosenAccount.dosen.program_studi,
        },
      };
    } catch (error) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `server error: ${error}`,
      };
    }
  }

  async updateBiodata(
    account: Account,
    request: DosenProfile,
  ): Promise<BaseResponse<string>> {
    try {
      const dosenAccount = await this.prismaService.dosenAccount.findFirst({
        where: {
          account_id: account.uuid,
        },
        include: {
          dosen: {},
        },
      });

      const profileRequest: DosenProfile = this.validationService.validate(
        DosenProfileValidation.PROFILE_DOSEN,
        request,
      );

      await this.prismaService.dosen.update({
        where: {
          nidn: dosenAccount.nidn,
        },
        data: {
          nidn: profileRequest.nidn,
          nama: profileRequest.nama,
          program_studi: profileRequest.programStudi,
          jenjang_pendidikan: profileRequest.jenjangPendidikan,
          jenis_kelamin: profileRequest.jenisKelamin,
          tanggal_lahir: profileRequest.tanggalLahir,
          jabatan_akademik: profileRequest.jabatanAkademik,
          no_telephone: profileRequest.noTelephone,
          alamat_surel: profileRequest.alamatSurel,
        },
      });

      return {
        status_code: 200,
        message: 'Biodata updated successfully',
      };
    } catch (error) {
      return {
        status_code: 500,
        message: `error:${error} `,
      };
    }
  }
}
