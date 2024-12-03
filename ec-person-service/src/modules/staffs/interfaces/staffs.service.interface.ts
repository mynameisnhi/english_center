import { Staff } from 'src/database/entities/staffs/staffs.entity';
import { IStaff } from 'src/database/types/staffs';

export interface IStaffService {
  createStaff: (staff: IStaff) => Promise<Staff>;
  getFilterStaff: (filter: Partial<IStaff>) => Promise<Staff[]>;
  getStaffs: () => Promise<Staff[]>;
  updateStaff: (staffId: string, staff: IStaff) => Promise<boolean>;
  deleteStaff: (staffId: string) => Promise<boolean>;
}
