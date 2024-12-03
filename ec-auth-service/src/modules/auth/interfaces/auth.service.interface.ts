export interface IAuthService {
  login: (server: string, email: string) => Promise<any>;
  updateInfo: (server: string, userId: string, data: any) => Promise<any>;
}
