import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IStudent, IStudentCreate } from 'src/database/types/students';

@Table({
  tableName: 'students',
})
export class Student extends Model<IStudent, IStudentCreate> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @Column
  name: string;

  @Column
  avatar: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column(DataType.DOUBLE)
  birthdate: number;

  @Column
  gender: string;

  @Column
  address: string;

  @Column(DataType.JSON)
  courses: string[];

  // @Column(DataType.JSON)
  // classes: string[];
}
