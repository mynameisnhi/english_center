import { Module } from '@nestjs/common';

import { AuthService } from './services/auth.service';

@Module({
  imports: [],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [],
})
export class AuthModule {}
