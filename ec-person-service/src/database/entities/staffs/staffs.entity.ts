import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IStaff, IStaffCreate } from 'src/database/types/staffs';

@Table({
  tableName: 'staffs',
})
export class Staff extends Model<IStaff, IStaffCreate> {
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
  role: string;

  @Column
  avatar: string;

  @Column
  gender: string;

  @Column(DataType.DOUBLE)
  birthdate: number;

  @Column
  address: string;
}
