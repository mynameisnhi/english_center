import { Module } from '@nestjs/common';

import { Student } from '../../database/entities/students/students.entity';
import { StudentService } from './services/students.service';

@Module({
  imports: [],
  exports: [
    StudentService,
    {
      provide: 'STUDENT_REPOSITORY',
      useValue: Student,
    },
  ],
  providers: [
    StudentService,
    {
      provide: 'STUDENT_REPOSITORY',
      useValue: Student,
    },
  ],
  controllers: [],
})
export class StudentModule {}
