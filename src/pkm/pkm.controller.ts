import { Controller, Get, Query } from '@nestjs/common';
import { PkmService } from './pkm.service';
import { Authentication } from 'src/common/auth.decorator';
import { Account } from '@prisma/client';

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
}
