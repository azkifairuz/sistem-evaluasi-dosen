import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthDosenModule } from './auth-dosen/auth-dosen.module';

@Module({
  imports: [CommonModule, AuthDosenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
