import { Optional } from 'sequelize';

export interface ITeacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  birthdate: number;
  gender: string;
  address: string;
  qualifications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ITeacherCreate = Optional<ITeacher, 'id'>;
