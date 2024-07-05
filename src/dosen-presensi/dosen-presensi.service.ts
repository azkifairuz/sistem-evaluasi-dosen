import { HttpStatus, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { BaseResponse } from 'src/model/BaseResponse.model';

@Injectable()
export class DosenPresensiService {
  constructor(private prismaService: PrismaService) {}

  async presensiOffline(
    isInLocation: boolean,
    account: Account,
  ): Promise<BaseResponse<string>> {
    try {
      if (!isInLocation) {
        return {
          status_code: HttpStatus.NOT_ACCEPTABLE,
          message: 'not in location',
        };
      }

      const dosen = await this.prismaService.dosenAccount.findFirst({
        where: {
          account_id: account.uuid,
        },
        include: {
          dosen: true,
        },
      });
      const date = new Date();
      const today = date.toLocaleDateString('id-ID', { weekday: 'long' });
      await this.prismaService.riwayatMasuk.create({
        data: {
          hari: today.toString(),
          jam: date,
          tanggal: date,
          tipe: 'offline',
          nidn: dosen.nidn,
          kegiatan: 'masuk',
        },
      });
      return {
        status_code: HttpStatus.OK,
        message: 'presensi success',
      };
    } catch (error) {
      return {
        status_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `error: ${error}`,
      };
    }
  }
}
