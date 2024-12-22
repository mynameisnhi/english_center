import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {
  ICourseSyllabus,
  ICourseSyllabusCreate,
} from 'src/database/types/courses';

import { Courses } from './courses.entity';

@Table({
  tableName: 'course-syllabus',
})
export class CourseSyllabus extends Model<
  ICourseSyllabus,
  ICourseSyllabusCreate
> {
  @PrimaryKey
  @ForeignKey(() => Courses)
  @Column
  course: string;

  @Column(DataType.JSON)
  styllabus: {
    id: string;
    week: number;
    description: string;
  }[];
}
