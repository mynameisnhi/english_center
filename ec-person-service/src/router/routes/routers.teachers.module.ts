import { Module } from '@nestjs/common';
import { TeacherApiController } from 'src/modules/teachers/controllers/teacher.api.controller';
import { TeacherModule } from 'src/modules/teachers/teacher.module';

@Module({
  imports: [TeacherModule],
  exports: [],
  providers: [],
  controllers: [TeacherApiController],
})
export class RouterTeacherModule {}
