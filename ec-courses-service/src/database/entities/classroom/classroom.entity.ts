import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IClassroom, IClassroomCreate } from 'src/database/types/classroom';

@Table({
  tableName: 'classrooms',
})
export class Classroom extends Model<IClassroom, IClassroomCreate> {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @Column
  name: string;

  @Column
  course: string;

  @Column
  room: string;

  @Column(DataType.JSON)
  teachers: string[];

  @Column(DataType.INTEGER)
  maxStudents: number;

  @Column
  status: string;

  @Column(DataType.JSON)
  schedule: {
    start?: number;
    end?: number;
    daysInWeek?: string[];
    hoursInDay?: {
      start?: string;
      end?: string;
    };
  };

  @Column(DataType.JSON)
  students: string[];

  @Column(DataType.JSON)
  completedSyallbus: Record<string, boolean>;
}
