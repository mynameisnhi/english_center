import { IStudent } from 'src/database/types/students';

import { Student } from '../../../database/entities/students/students.entity';

export interface IStudentService {
  getStudent: (filter: Partial<IStudent>) => Promise<Student[]>;
  getStudents: () => Promise<Student[]>;
  createStudent: (student: Partial<IStudent>) => Promise<Student>;
  updateStudent: (id: string, student: Student) => Promise<boolean>;
  deleteStudent: (studentId: string) => Promise<boolean>;
}
