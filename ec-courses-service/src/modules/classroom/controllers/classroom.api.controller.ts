import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  IAssignment,
  IClassroom,
  ISubmission,
} from 'src/database/types/classroom';

import { ClassroomService } from '../services/classroom.service';

@Controller()
export class ClassroomApiController {
  constructor(private readonly classroomServices: ClassroomService) {}

  @Get('/')
  async getClassroomByFilter(
    @Query() filter: Partial<IClassroom>,
  ): Promise<IClassroom[]> {
    if (!Object.keys(filter).length) {
      const classes = await this.classroomServices.getClassrooms();
      return classes.map((c) => c.dataValues);
    } else {
      const classes = await this.classroomServices.getFilterClassroom(filter);
      return classes.map((c) => c.dataValues);
    }
  }

  @Post('/')
  async createClassroom(
    @Body() data: { classroom: Partial<IClassroom> },
  ): Promise<IClassroom> {
    const newClassroom = await this.classroomServices.createClassroom(
      data.classroom,
    );
    return newClassroom.dataValues;
  }

  @Put('/')
  async updateClassroom(
    @Body() data: { id: string; classroom: IClassroom },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.updateClassroom(
      data.id,
      data.classroom,
    );
    return { success };
  }

  @Delete('/')
  async deleteClassroom(
    @Query() data: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.deleteClassroom(data.id);
    return { success };
  }

  // Assignment

  @Get('/assignment')
  async getAssignmentByFilter(
    @Query() filter: { classroomId: string },
  ): Promise<IAssignment[]> {
    const assignments =
      await this.classroomServices.getFilterAssignment(filter);
    return assignments.map((a) => a.dataValues);
  }

  @Post('/assignment')
  async createAssignment(
    @Body() data: { assignment: { classroomId: string; title: string } },
  ): Promise<IAssignment> {
    const success = await this.classroomServices.createAssignment(
      data.assignment,
    );
    return success.dataValues;
  }

  @Put('/assignment')
  async updateAssignment(
    @Body()
    data: {
      id: string;
      assignment: { classroomId: string; title: string };
    },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.updateAssignment(
      data.id,
      data.assignment,
    );
    return { success };
  }

  @Delete('/assignment')
  async deleteAssignment(
    @Query() data: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.deleteAssignment(data.id);
    return { success };
  }

  // Submission

  @Get('/submission')
  async getSubmissionByFilter(
    @Query() filter: { assignmentId: string },
  ): Promise<ISubmission[]> {
    const submissions =
      await this.classroomServices.getFilterSubmission(filter);
    return submissions.map((s) => s.dataValues);
  }

  @Post('/submission')
  @UseInterceptors(FileInterceptor('file'))
  async createSubmission(
    @UploadedFile() file: Express.Multer.File,
    @Body() submission: Partial<ISubmission>,
  ): Promise<ISubmission> {
    const submissionData = { ...submission, file };
    const success =
      await this.classroomServices.createSubmission(submissionData);
    return success.dataValues;
  }

  @Put('/submission')
  async updateSubmission(
    @Body()
    data: {
      studentId: string;
      assignmentId: string;
      submission: { assignmentId: string; content: string };
    },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.updateSubmission(
      data.studentId,
      data.assignmentId,
      data.submission,
    );
    return { success };
  }

  @Delete('/submission')
  async deleteSubmission(
    @Query() data: { studentId: string; assignmentId: string },
  ): Promise<{ success: boolean }> {
    const success = await this.classroomServices.deleteSubmission(
      data.studentId,
      data.assignmentId,
    );
    return { success };
  }
}
