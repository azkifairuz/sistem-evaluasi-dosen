import { Module } from '@nestjs/common';
import { DosenPresensiController } from './dosen-presensi.controller';
import { DosenPresensiService } from './dosen-presensi.service';

@Module({
  controllers: [DosenPresensiController],
  providers: [DosenPresensiService],
})
export class DosenPresensiModule {}
