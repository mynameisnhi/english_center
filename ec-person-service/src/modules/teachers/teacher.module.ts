import { Module } from '@nestjs/common';

import { Teacher } from '../../database/entities/teachers/teacher.entity';
import { TeacherService } from './services/teacher.service';

@Module({
  imports: [],
  exports: [
    TeacherService,
    {
      provide: 'TEACHER_REPOSITORY',
      useValue: Teacher,
    },
  ],
  providers: [
    TeacherService,
    {
      provide: 'TEACHER_REPOSITORY',
      useValue: Teacher,
    },
  ],
  controllers: [],
})
export class TeacherModule {}
