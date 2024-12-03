import { Inject, Injectable } from '@nestjs/common';
import { generateID } from 'src/common';
import { IStudent } from 'src/database/types/students';

import { Student } from '../../../database/entities/students/students.entity';
import { IStudentService } from '../interfaces/students.service.interface';

@Injectable()
export class StudentService implements IStudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: typeof Student,
  ) {}

  async getStudent(filter: Partial<IStudent>): Promise<Student[]> {
    return this.studentRepository.findAll({
      where: filter,
    });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.findAll();
  }

  async createStudent(student: Partial<IStudent>): Promise<Student> {
    return this.studentRepository.create({
      ...student,
      id: generateID(),
    });
  }

  async updateStudent(id: string, student: Partial<Student>): Promise<boolean> {
    const updated = await this.studentRepository.update(student, {
      where: {
        id,
      },
    });

    return updated[0] > 0;
  }

  async deleteStudent(studentId: string): Promise<boolean> {
    const deleted = await this.studentRepository.destroy({
      where: {
        id: studentId,
      },
    });
    return deleted > 0;
  }
}
