import { Inject, Injectable } from '@nestjs/common';
import fs from 'fs';
import { generateID, PATH_UPLOADS } from 'src/common';
import { Assignment } from 'src/database/entities/classroom/assignment.entity';
import { Submission } from 'src/database/entities/classroom/submission.entity';
import { IClassroom, ISubmission } from 'src/database/types/classroom';

import { Classroom } from '../../../database/entities/classroom/classroom.entity';
import { IClassroomService } from '../interfaces/classroom.service.interface';

@Injectable()
export class ClassroomService implements IClassroomService {
  constructor(
    @Inject('CLASSROOM_REPOSITORY')
    private classroomRepository: typeof Classroom,
    @Inject('ASSIGNMENT_REPOSITORY')
    private assignmentRepository: typeof Assignment,
    @Inject('SUBMISSION_REPOSITORY')
    private submissionRepository: typeof Submission,
  ) {}

  async getFilterClassroom(filter: Partial<IClassroom>): Promise<Classroom[]> {
    return this.classroomRepository.findAll({
      where: filter,
    });
  }

  async getClassrooms(): Promise<Classroom[]> {
    return this.classroomRepository.findAll();
  }

  async createClassroom(classroom: Partial<IClassroom>): Promise<Classroom> {
    return this.classroomRepository.create({
      ...classroom,
      id: generateID(),
    });
  }

  async updateClassroom(
    id: string,
    classroom: Partial<Classroom>,
  ): Promise<boolean> {
    const updated = await this.classroomRepository.update(classroom, {
      where: {
        id,
      },
    });
    return updated[0] > 0;
  }

  async deleteClassroom(classroomId: string): Promise<boolean> {
    const deleted = await this.classroomRepository.destroy({
      where: {
        id: classroomId,
      },
    });
    return deleted > 0;
  }

  // Assignment

  async getFilterAssignment(filter: {
    classroomId: string;
  }): Promise<Assignment[]> {
    return this.assignmentRepository.findAll({
      where: filter,
    });
  }

  async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
    return this.assignmentRepository.create({
      ...assignment,
      id: generateID(),
    });
  }

  async updateAssignment(
    id: string,
    assignment: Partial<Assignment>,
  ): Promise<boolean> {
    const updated = await this.assignmentRepository.update(assignment, {
      where: {
        id,
      },
    });
    return updated[0] > 0;
  }

  async deleteAssignment(assignmentId: string): Promise<boolean> {
    const deleted = await this.assignmentRepository.destroy({
      where: {
        id: assignmentId,
      },
    });
    return deleted > 0;
  }

  // Submission

  async getFilterSubmission(filter: {
    assignmentId: string;
  }): Promise<Submission[]> {
    return this.submissionRepository.findAll({
      where: {
        assignmentId: filter.assignmentId,
      },
    });
  }

  async createSubmission(
    submission: Partial<ISubmission> & { file: Express.Multer.File },
  ): Promise<Submission> {
    if (!submission.assignmentId || !submission.studentId) {
      throw new Error('Missing assignmentId or studentId');
    }

    const { file, ...submissionData } = submission;
    if (!file) {
      throw new Error('Missing file');
    }
    const fileExtension = file.originalname.split('.').pop();
    const path = `${PATH_UPLOADS}/submissions/${submission.assignmentId}/${submission.studentId}.${fileExtension}`;
    // Save file to disk
    fs.mkdirSync(`${PATH_UPLOADS}/submissions/${submission.assignmentId}`, {
      recursive: true,
    });
    fs.writeFileSync(path, file.buffer);
    // Save path to database
    const esxitSubmission = await this.submissionRepository.findOne({
      where: {
        assignmentId: submission.assignmentId,
        studentId: submission.studentId,
      },
    });
    if (esxitSubmission) {
      await this.submissionRepository.update(
        {
          ...submissionData,
          path: `submissions/${submission.assignmentId}/${submission.studentId}.${fileExtension}`,
        },
        {
          where: {
            assignmentId: submission.assignmentId,
            studentId: submission.studentId,
          },
        },
      );
      return esxitSubmission;
    } else {
      const created = await this.submissionRepository.create({
        ...submissionData,
        path: `submissions/${submission.assignmentId}/${submission.studentId}.${fileExtension}`,
      });
      return created;
    }
  }

  async updateSubmission(
    studentId: string,
    assignmentId: string,
    submission: Partial<Submission>,
  ): Promise<boolean> {
    const updated = await this.submissionRepository.update(submission, {
      where: {
        studentId,
        assignmentId,
      },
    });
    return updated[0] > 0;
  }

  async deleteSubmission(
    studentId: string,
    assignmentId: string,
  ): Promise<boolean> {
    const deleted = await this.submissionRepository.destroy({
      where: {
        studentId,
        assignmentId,
      },
    });
    return deleted > 0;
  }
}
