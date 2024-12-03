import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ISubmission, ISubmissionCreate } from 'src/database/types/classroom';

import { Assignment } from './assignment.entity';

@Table({
  tableName: 'submission',
})
export class Submission extends Model<ISubmission, ISubmissionCreate> {
  @PrimaryKey
  @ForeignKey(() => Assignment)
  @Column
  assignmentId: string;

  @PrimaryKey
  @Column
  studentId: string;

  @Column
  submission: string;

  @Column
  path: string;
}
