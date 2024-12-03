import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ITeacher, ITeacherCreate } from 'src/database/types/teachers';

@Table({
  tableName: 'teachers',
})
export class Teacher extends Model<ITeacher, ITeacherCreate> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  avatar: string;

  @Column
  gender: string;

  @Column(DataType.DOUBLE)
  birthdate: number;

  @Column
  address: string;

  @Column(DataType.JSON)
  qualifications: string[];
}
