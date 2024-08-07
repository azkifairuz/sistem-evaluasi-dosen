import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Post(':pkmId')
  @UseInterceptors(FileInterceptor('document'))
  async update(
    @Authentication() account: Account,
    @Body() pkmRequest: PkmRequest,
    @Param('pkmId') pkmId: string,
    @UploadedFile() document: Express.Multer.File,
  ): Promise<BaseResponse<string>> {
    return await this.pkmService.updatePkm(
      account,
      pkmRequest,
      parseInt(pkmId),
      document,
    );
  }

  @Get(':pkmId')
  async getPkmById(
    @Authentication() account: Account,
    @Param('pkmId') pkmId: string,
  ) {
    return await this.pkmService.getDetailPkm(account, parseInt(pkmId));
  }

  @Delete(':pkmId')
  async delete(
    @Authentication() account: Account,
    @Param('pkmId') pkmId: string,
  ) {
    return await this.pkmService.delete(account, parseInt(pkmId));
  }
}
