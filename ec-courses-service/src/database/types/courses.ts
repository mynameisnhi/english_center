import { Optional } from 'sequelize';

export interface ICourses {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  status: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseSyllabus {
  course: string;
  syllabus: {
    week: number;
    description: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export type ICoursesCreate = Optional<ICourses, 'id'>;
export type ICourseSyllabusCreate = Optional<ICourseSyllabus, 'course'>;
