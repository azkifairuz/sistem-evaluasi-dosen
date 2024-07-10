import { Module } from '@nestjs/common';
import { DosenProfileController } from './dosen-profile.controller';
import { DosenProfileService } from './dosen-profile.service';

@Module({
  controllers: [DosenProfileController],
  providers: [DosenProfileService]
})
export class DosenProfileModule {}
