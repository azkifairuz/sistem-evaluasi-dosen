import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DosenPresensiService } from './dosen-presensi.service';
import { Authentication } from 'src/common/auth.decorator';
import { Account } from '@prisma/client';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('/izin')
  @UseInterceptors(FileInterceptor('file'))
  async izin(
    @Authentication() account: Account,
    @Body('reason') reason: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.presensiService.izin(account, reason, file);
  }
}
