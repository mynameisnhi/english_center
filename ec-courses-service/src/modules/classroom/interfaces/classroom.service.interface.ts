import { IClassroom } from 'src/database/types/classroom';

import { Classroom } from '../../../database/entities/classroom/classroom.entity';

export interface IClassroomService {
  getFilterClassroom: (filter: Partial<IClassroom>) => Promise<Classroom[]>;
  getClassrooms: () => Promise<Classroom[]>;
  createClassroom: (classroom: Partial<IClassroom>) => Promise<Classroom>;
  updateClassroom: (id: string, classroom: Classroom) => Promise<boolean>;
  deleteClassroom: (classroomId: string) => Promise<boolean>;
}
