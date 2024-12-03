import { Optional } from 'sequelize';

export interface IStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  birthdate: number;
  gender: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IStaffCreate = Optional<IStaff, 'id'>;
