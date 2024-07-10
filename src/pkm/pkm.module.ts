import { Module } from '@nestjs/common';
import { PkmService } from './pkm.service';
import { PkmController } from './pkm.controller';

@Module({
  providers: [PkmService],
  controllers: [PkmController],
})
export class PkmModule {}
