import { Body, Controller, Get, Post } from '@nestjs/common';
import { DosenProfileService } from './dosen-profile.service';
import { Authentication } from 'src/common/auth.decorator';
import { Account } from '@prisma/client';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { DosenProfile } from 'src/model/Dosen.model';

@Controller('dosen/profile')
export class DosenProfileController {
  constructor(private dosenProfileService: DosenProfileService) {}

  @Get()
  async getDosenProfile(
    @Authentication() account: Account,
  ): Promise<BaseResponse<DosenProfile>> {
    return await this.dosenProfileService.getProfile(account);
  }

  @Post()
  async updateDosenProfile(
    @Authentication() account: Account,
    @Body() request: DosenProfile,
  ): Promise<BaseResponse<string>> {
    return await this.dosenProfileService.updateBiodata(account, request);
  }
}