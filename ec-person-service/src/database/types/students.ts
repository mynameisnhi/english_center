import { Optional } from 'sequelize';

export interface IStudent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  birthdate: number;
  gender: string;
  address?: string;
  courses?: string[];
  // classes?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type IStudentCreate = Optional<IStudent, 'id'>;
