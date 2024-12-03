import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ICourses, ICourseSyllabus } from 'src/database/types/courses';

import { CoursesService } from '../services/courses.service';

@Controller()
export class CoursesApiController {
  constructor(private readonly coursesServices: CoursesService) {}

  @Get('/')
  async getCourse(@Query() filter: Partial<ICourses>): Promise<ICourses[]> {
    if (!Object.keys(filter).length) {
      const classes = await this.coursesServices.getCourses();
      return classes.map((c) => c.dataValues);
    } else {
      const classes = await this.coursesServices.getFilterCourse(filter);
      return classes.map((c) => c.dataValues);
    }
  }

  @Post('/')
  async createCourse(
    @Body() data: { course: Partial<ICourses> },
  ): Promise<ICourses> {
    const newCourse = await this.coursesServices.createCourse(data.course);
    return newCourse.dataValues;
  }

  @Put('/')
  async updateCourse(
    @Body() data: { id: string; course: Partial<ICourses> },
  ): Promise<{ success: boolean }> {
    const success = await this.coursesServices.updateCourse(
      data.id,
      data.course,
    );
    return { success };
  }

  @Delete('/')
  async deleteCourse(
    @Query() query: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.coursesServices.deleteCourse(query.id);
    return { success };
  }

  // Syllabus

  @Post('/syllabus')
  async createSyllabus(
    @Body() data: Partial<ICourseSyllabus>,
  ): Promise<ICourseSyllabus> {
    const success = await this.coursesServices.createSyllabus(data);
    return success.dataValues;
  }

  @Get('/syllabus')
  async getSyllabus(
    @Query() query: { courseId: string },
  ): Promise<ICourseSyllabus> {
    const success = await this.coursesServices.getSyllabus(query.courseId);
    return success.dataValues;
  }

  @Put('/syllabus')
  async updateSyllabus(
    @Body() data: { course: string; syllabus: ICourseSyllabus },
  ): Promise<{ success: boolean }> {
    const success = await this.coursesServices.updateSyllabus(
      data.course,
      data.syllabus,
    );
    return { success };
  }

  @Delete('/syllabus')
  async deleteSyllabus(
    @Query() data: { course: string },
  ): Promise<{ success: boolean }> {
    const success = await this.coursesServices.deleteSyllabus(data.course);
    return { success };
  }
}
