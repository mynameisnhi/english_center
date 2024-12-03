import { Sequelize } from 'sequelize-typescript';
import { Classroom } from 'src/database/entities/classroom/classroom.entity';
import { Courses } from 'src/database/entities/courses/courses.entity';

import { Assignment } from './entities/classroom/assignment.entity';
import { Submission } from './entities/classroom/submission.entity';
import { CourseSyllabus } from './entities/courses/syllabus.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([
        Classroom,
        Assignment,
        Submission,
        Courses,
        CourseSyllabus,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
