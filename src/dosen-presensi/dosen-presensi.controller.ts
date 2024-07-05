import { Body, Controller, Post } from '@nestjs/common';
import { DosenPresensiService } from './dosen-presensi.service';
import { Authentication } from 'src/common/auth.decorator';
import { Account } from '@prisma/client';
import { BaseResponse } from 'src/model/BaseResponse.model';

@Controller('presensi-dosen')
export class DosenPresensiController {
  constructor(private presensiService: DosenPresensiService) {}

  @Post('/offline')
  async presensiOffline(
    @Body('isInLocation') isInLocation: boolean,
    @Authentication() account: Account,
  ): Promise<BaseResponse<string>> {
    return await this.presensiService.presensiOffline(isInLocation, account);
  }
  @Post('/online')
  async presensiOnline(
    @Authentication() account: Account,
  ): Promise<BaseResponse<string>> {
    return await this.presensiService.presensiOnline(account);
  }

  @Post('/checkout')
  async checkout(
    @Authentication() account: Account,
  ): Promise<BaseResponse<string>> {
    return await this.presensiService.checkout(account);
  }
}
