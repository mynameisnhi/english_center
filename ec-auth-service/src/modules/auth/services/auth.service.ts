import { Injectable } from '@nestjs/common';
import { callAPI } from 'src/common';

import { IAuthService } from '../interfaces/auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor() {}

  async login(server: string, email: any): Promise<any> {
    if (server === 'management') {
      const verify = await callAPI('/staffs', { email: email });
      if (verify.length) {
        return { user: verify[0], role: verify[0].role };
      }
    } else {
      const studentData = await callAPI('/students', { email: email });
      if (studentData.length) {
        return { user: studentData[0], role: 'student' };
      }
      const teacherData = await callAPI('/teachers', { email: email });
      if (teacherData.length) {
        return { user: teacherData[0], role: 'teacher' };
      }
    }
    return null;
  }

  async updateInfo(server: string, role: string, data: any): Promise<any> {
    if (server === 'management') {
      return await callAPI(
        '/staffs',
        {
          id: data.id,
          staff: data,
        },
        'PUT',
      );
    } else {
      if (role === 'student') {
        return await callAPI(
          '/students',
          {
            id: data.id,
            student: data,
          },
          'PUT',
        );
      } else {
        return await callAPI(
          '/teachers',
          {
            id: data.id,
            teacher: data,
          },
          'PUT',
        );
      }
    }
  }
}
