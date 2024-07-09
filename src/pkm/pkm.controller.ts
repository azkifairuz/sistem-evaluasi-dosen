import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PkmService } from './pkm.service';
import { Authentication } from 'src/common/auth.decorator';
import { Account } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { PkmRequest } from 'src/model/Pkm.model';

@Controller('pkm')
export class PkmController {
  constructor(private pkmService: PkmService) {}

  @Get()
  async getListPkm(
    @Authentication() account: Account,
    @Query('page') page: number,
  ) {
    return await this.pkmService.getListPkm(account, page);
  }

  @Post()
  @UseInterceptors(FileInterceptor('document'))
  async createPkm(
    @Authentication() account: Account,
    @Body() pkmRequest: PkmRequest,
    @UploadedFile() document: Express.Multer.File,
  ): Promise<BaseResponse<string>> {
    return await this.pkmService.createPkm(account, pkmRequest, document);
  }
}
