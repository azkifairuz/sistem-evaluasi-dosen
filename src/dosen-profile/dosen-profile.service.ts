import { HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { DosenProfile } from 'src/model/Dosen.model';

@Injectable()
export class DosenProfileService {
  constructor(private prismaService: PrismaService) {}

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
}
