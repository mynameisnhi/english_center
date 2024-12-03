import { Body, Controller, Post, Put, Session } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Controller()
export class AuthApiController {
  constructor(private readonly authServices: AuthService) {}

  @Post('/auth')
  async createAuth(
    @Body() data: { token: string; user: any; server: string },
    @Session() session,
  ): Promise<any> {
    const { user, server, token } = data;
    if (!token) {
      return null;
    }
    const { email, ...useData } = user;
    const auth = await this.authServices.login(server, email);
    if (auth) {
      await this.authServices.updateInfo(server, auth.role, {
        ...useData,
        id: auth.user.id,
      });
      session.user = {
        ...auth.user,
        role: auth.role,
      };
      return auth;
    }
    return null;
  }

  @Put('/update')
  async updateUser(
    @Body() data: { role: string; user: any; server: string },
  ): Promise<{ success: boolean }> {
    const { role, user, server } = data;
    const success = await this.authServices.updateInfo(server, role, user);
    return { success };
  }

  @Post('/signOut')
  async deleteAuth(): Promise<{ success: boolean }> {
    return { success: true };
  }
}
