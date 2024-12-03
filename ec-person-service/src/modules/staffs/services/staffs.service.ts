import { Inject, Injectable } from '@nestjs/common';
import { generateID } from 'src/common';
import { Staff } from 'src/database/entities/staffs/staffs.entity';
import { IStaff } from 'src/database/types/staffs';

import { IStaffService } from '../interfaces/staffs.service.interface';

@Injectable()
export class StaffService implements IStaffService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private staffRepository: typeof Staff,
  ) {}

  async createStaff(staff: Partial<IStaff>): Promise<Staff> {
    return this.staffRepository.create({
      ...staff,
      id: generateID(),
    });
  }

  async getFilterStaff(filter: Partial<IStaff>): Promise<Staff[]> {
    return this.staffRepository.findAll({
      where: filter,
    });
  }

  async getStaffs(): Promise<Staff[]> {
    return this.staffRepository.findAll();
  }

  async updateStaff(id: string, staff: Partial<IStaff>): Promise<boolean> {
    const updated = await this.staffRepository.update(staff, {
      where: {
        id: id,
      },
    });
    return updated[0] > 0;
  }

  async deleteStaff(staffId: string): Promise<boolean> {
    const deleted = await this.staffRepository.destroy({
      where: {
        id: staffId,
      },
    });
    return deleted > 0;
  }
}
