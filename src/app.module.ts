import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthDosenModule } from './auth-dosen/auth-dosen.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    CommonModule,
    AuthDosenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
