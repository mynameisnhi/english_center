import { Inject, Injectable } from '@nestjs/common';
import { generateID } from 'src/common';
import { CourseSyllabus } from 'src/database/entities/courses/syllabus.entity';
import { ICourses, ICourseSyllabus } from 'src/database/types/courses';

import { Courses } from '../../../database/entities/courses/courses.entity';
import { ICoursesService } from '../interfaces/courses.service.interface';

@Injectable()
export class CoursesService implements ICoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private coursesRepository: typeof Courses,
    @Inject('COURSES_SYLLABUS_REPOSITORY')
    private syllabusRepository: typeof CourseSyllabus,
  ) {}

  // Courses Service Methods
  async createCourse(course: Partial<ICourses>): Promise<Courses> {
    return this.coursesRepository.create({
      ...course,
      id: generateID(),
    });
  }

  async getFilterCourse(filter: Partial<ICourses>): Promise<Courses[]> {
    return this.coursesRepository.findAll({
      where: filter,
    });
  }

  async getCourses(): Promise<Courses[]> {
    return this.coursesRepository.findAll();
  }

  async updateCourse(id: string, course: Partial<ICourses>): Promise<boolean> {
    const updated = await this.coursesRepository.update(course, {
      where: {
        id: id,
      },
    });
    return updated[0] > 0;
  }

  async deleteCourse(courseId: string): Promise<boolean> {
    const deleted = await this.coursesRepository.destroy({
      where: {
        id: courseId,
      },
    });
    return deleted > 0;
  }

  // Syllabus Service Methods
  async createSyllabus(
    syllabus: Partial<ICourseSyllabus>,
  ): Promise<CourseSyllabus> {
    return this.syllabusRepository.create(syllabus);
  }

  async getSyllabus(courseId: string): Promise<CourseSyllabus> {
    return this.syllabusRepository.findOne({
      where: {
        course: courseId,
      },
    });
  }

  async updateSyllabus(
    courseId: string,
    syllabus: ICourseSyllabus,
  ): Promise<boolean> {
    const updated = await this.syllabusRepository.update(syllabus, {
      where: {
        course: courseId,
      },
    });
    return updated[0] > 0;
  }

  async deleteSyllabus(courseId: string): Promise<boolean> {
    const deleted = await this.syllabusRepository.destroy({
      where: {
        course: courseId,
      },
    });
    return deleted > 0;
  }
}
