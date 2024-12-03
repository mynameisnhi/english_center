import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ICourses, ICoursesCreate } from 'src/database/types/courses';

@Table({
  tableName: 'courses',
})
export class Courses extends Model<ICourses, ICoursesCreate> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  duration: number;

  @Column
  level: string;

  @Column
  status: string;

  @Column
  price: number;
}
