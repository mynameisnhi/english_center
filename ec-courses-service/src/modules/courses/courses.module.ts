import { Module } from '@nestjs/common';
import { CourseSyllabus } from 'src/database/entities/courses/syllabus.entity';

import { Courses } from '../../database/entities/courses/courses.entity';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [],
  exports: [
    CoursesService,
    {
      provide: 'COURSES_REPOSITORY',
      useValue: Courses,
    },
    {
      provide: 'COURSES_SYLLABUS_REPOSITORY',
      useValue: CourseSyllabus,
    },
  ],
  providers: [
    CoursesService,
    {
      provide: 'COURSES_REPOSITORY',
      useValue: Courses,
    },
    {
      provide: 'COURSES_SYLLABUS_REPOSITORY',
      useValue: CourseSyllabus,
    },
  ],
  controllers: [],
})
export class CoursesModule {}
