import { Controller, Get } from '@nestjs/common';
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
}
