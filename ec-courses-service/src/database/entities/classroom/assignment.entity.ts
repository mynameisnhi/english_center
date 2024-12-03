import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IAssignment, IAssignmentCreate } from 'src/database/types/classroom';

import { Classroom } from './classroom.entity';

@Table({
  tableName: 'assignment',
})
export class Assignment extends Model<IAssignment, IAssignmentCreate> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @ForeignKey(() => Classroom)
  @Column
  classId: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column(DataType.DATE)
  dueDate: Date;
}
