import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthDosenModule } from './auth-dosen/auth-dosen.module';
import { PassportModule } from '@nestjs/passport';
import { DosenPresensiModule } from './dosen-presensi/dosen-presensi.module';
@Module({
  imports: [
    CommonModule,
    AuthDosenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DosenPresensiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
