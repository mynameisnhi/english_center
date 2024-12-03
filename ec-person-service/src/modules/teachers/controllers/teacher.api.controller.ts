import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ITeacher } from 'src/database/types/teachers';

import { TeacherService } from '../services/teacher.service';

@Controller()
export class TeacherApiController {
  constructor(private readonly teacherServices: TeacherService) {}

  @Get('/')
  async getTeacher(
    @Param() param: Partial<ITeacher>,
    @Query() query: any,
  ): Promise<ITeacher[]> {
    const filter = { ...param, ...query };
    if (!Object.keys(filter).length) {
      const teachers = await this.teacherServices.getTeachers();
      return teachers.map((teacher) => teacher.dataValues);
    } else {
      const teachers = await this.teacherServices.getFilterTeacher(filter);
      return teachers.map((teacher) => teacher.dataValues);
    }
  }

  @Post('/')
  async createTeacher(
    @Body() data: { teacher: Partial<ITeacher> },
  ): Promise<ITeacher> {
    const newTeacher = await this.teacherServices.createTeacher(data.teacher);
    return newTeacher.dataValues;
  }

  @Put('/')
  async updateTeacher(
    @Body() data: { id: string; teacher: Partial<ITeacher> },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.updateTeacher(
      data.id,
      data.teacher,
    );
    return { success };
  }

  @Delete('/')
  async deleteTeacher(
    @Query() data: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.deleteTeacher(data.id);
    return { success };
  }
}
