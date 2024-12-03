import { Module } from '@nestjs/common';
import { CoursesApiController } from 'src/modules/courses/controllers/courses.api.controller';
import { CoursesModule } from 'src/modules/courses/courses.module';

@Module({
  imports: [CoursesModule],
  exports: [],
  providers: [],
  controllers: [CoursesApiController],
})
export class RouterCoursesModule {}
