import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { BaseResponse } from 'src/model/BaseResponse.model';
import { DosenLoginRequest, DosenLoginResponse } from 'src/model/Dosen.model';
import { AuthDosenValidation } from './auth-dosen.validate';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthDosenService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async loginDosen(
    request: DosenLoginRequest,
  ): Promise<BaseResponse<DosenLoginResponse>> {
    try {
      this.logger.debug(`start login ${request.nidn}`);
      const dosenLoginRequest: DosenLoginRequest =
        this.validationService.validate(
          AuthDosenValidation.LOGIN_DOSEN,
          request,
        );

      const dosen = await this.prismaService.dosenAccount.findFirst({
        where: {
          nidn: dosenLoginRequest.nidn,
        },
        include: {
          account: {
            select: {
              password: true,
              uuid: true,
            },
          },
        },
      });

      if (!dosen) {
        return {
          status_code: 404,
          message: 'account not found',
        };
      }
      const isPasswordValid = await bcrypt.compare(
        dosenLoginRequest.password,
        dosen.account.password,
      );
      if (!isPasswordValid) {
        return {
          status_code: 404,
          message: 'username or password',
        };
      }
      const secretKey = process.env.JWT_KEY;
      const token = jwt.sign(
        {
          nidn: dosen.nidn,
          dosen_id: dosen.account_id,
        },
        secretKey,
        {
          expiresIn: '365d',
        },
      );

      await this.prismaService.account.update({
        where: {
          uuid: dosen.account_id,
        },
        data: {
          token: token,
        },
      });

      return {
        data: {
          nidn: dosen.nidn,
          token: token,
        },
        status_code: 200,
        message: 'login success',
      };
    } catch (error) {
      return {
        status_code: 500,
        message: `server error: ${error}`,
      };
    }
  }
}
