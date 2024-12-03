import { Module } from '@nestjs/common';
import { StaffApiController } from 'src/modules/staffs/controllers/staffs.api.controller';
import { StaffModule } from 'src/modules/staffs/staffs.module';

@Module({
  imports: [StaffModule],
  exports: [],
  providers: [],
  controllers: [StaffApiController],
})
export class RouterStaffModule {}
