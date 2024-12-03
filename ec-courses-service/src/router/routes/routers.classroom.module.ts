import { Module } from '@nestjs/common';
import { ClassroomModule } from 'src/modules/classroom/classroom.module';
import { ClassroomApiController } from 'src/modules/classroom/controllers/classroom.api.controller';

@Module({
  imports: [ClassroomModule],
  exports: [],
  providers: [],
  controllers: [ClassroomApiController],
})
export class RouterClassroomModule {}
