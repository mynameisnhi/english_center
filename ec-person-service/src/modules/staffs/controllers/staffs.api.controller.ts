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
import { IStaff } from 'src/database/types/staffs';

import { StaffService } from '../services/staffs.service';

@Controller()
export class StaffApiController {
  constructor(private readonly teacherServices: StaffService) {}

  @Get('/')
  async getStaff(
    @Param() params: Partial<IStaff>,
    @Query() query: any,
  ): Promise<IStaff[]> {
    const filter = { ...params, ...query };
    if (!Object.keys(filter).length) {
      const staffs = await this.teacherServices.getStaffs();
      return staffs.map((staff) => staff.dataValues);
    } else {
      const staffs = await this.teacherServices.getFilterStaff(filter);
      return staffs.map((staff) => staff.dataValues);
    }
  }

  @Post('/')
  async createStaff(@Body() data: { staff: Partial<IStaff> }): Promise<IStaff> {
    const newStaff = await this.teacherServices.createStaff(data.staff);
    return newStaff.dataValues;
  }

  @Put('/')
  async updateStaff(
    @Body() data: { id: string; staff: Partial<IStaff> },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.updateStaff(data.id, data.staff);
    return { success };
  }

  @Delete('/')
  async deleteStaff(
    @Query() data: { id: string },
  ): Promise<{ success: boolean }> {
    const success = await this.teacherServices.deleteStaff(data.id);
    return { success };
  }
}
