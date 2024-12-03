import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthApiController } from 'src/modules/auth/controllers/auth.api.controller';

@Module({
  imports: [AuthModule],
  exports: [],
  providers: [],
  controllers: [AuthApiController],
})
export class RouterAuthModule {}
