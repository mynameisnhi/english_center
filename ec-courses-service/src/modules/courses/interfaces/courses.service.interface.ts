import { ICourses } from 'src/database/types/courses';

import { Courses } from '../../../database/entities/courses/courses.entity';

export interface ICoursesService {
  createCourse: (courses: ICourses) => Promise<Courses>;
  getFilterCourse: (filter: Partial<ICourses>) => Promise<Courses[]>;
  getCourses: () => Promise<Courses[]>;
  // updateClassroom: (classroom: Classroom) => Promise<Classroom>;
  // deleteClassroom: (classroomId: string) => Promise<boolean>;
}
