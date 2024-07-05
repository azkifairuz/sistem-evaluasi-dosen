import { Body, Controller, Post } from '@nestjs/common';
import { AuthDosenService } from './auth-dosen.service';
import { DosenLoginRequest, DosenLoginResponse } from 'src/model/Dosen.model';
import { BaseResponse } from 'src/model/BaseResponse.model';

@Controller('auth-dosen')
export class AuthDosenController {
  constructor(private dosenAuthService: AuthDosenService) {}

  @Post('/login')
  async loginDosen(
    @Body() request: DosenLoginRequest,
  ): Promise<BaseResponse<DosenLoginResponse>> {
    return await this.dosenAuthService.loginDosen(request);
  }
}
