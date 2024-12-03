import { Module } from '@nestjs/common';
import { Assignment } from 'src/database/entities/classroom/assignment.entity';
import { Submission } from 'src/database/entities/classroom/submission.entity';

import { Classroom } from '../../database/entities/classroom/classroom.entity';
import { ClassroomService } from './services/classroom.service';

@Module({
  imports: [],
  exports: [
    ClassroomService,
    {
      provide: 'CLASSROOM_REPOSITORY',
      useValue: Classroom,
    },
    {
      provide: 'ASSIGNMENT_REPOSITORY',
      useValue: Assignment,
    },
    {
      provide: 'SUBMISSION_REPOSITORY',
      useValue: Submission,
    },
  ],
  providers: [
    ClassroomService,
    {
      provide: 'CLASSROOM_REPOSITORY',
      useValue: Classroom,
    },
    {
      provide: 'ASSIGNMENT_REPOSITORY',
      useValue: Assignment,
    },
    {
      provide: 'SUBMISSION_REPOSITORY',
      useValue: Submission,
    },
  ],
  controllers: [],
})
export class ClassroomModule {}
