import { Optional } from 'sequelize';

export interface IClassroom {
  id: string;
  name: string;
  course: string;
  room: string;
  teachers: string[];
  maxStudents: number;
  status: string;
  schedule: {
    start?: number;
    end?: number;
    daysInWeek?: string[];
    hoursInDay?: {
      start?: string;
      end?: string;
    };
  };
  students?: string[];
  completedSyallbus?: Record<string, boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAssignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: Date;
}

export interface ISubmission {
  assignmentId: string;
  studentId: string;
  submission: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IClassroomCreate = Optional<IClassroom, 'id'>;
export type IAssignmentCreate = Optional<IAssignment, 'id'>;
export type ISubmissionCreate = ISubmission;
