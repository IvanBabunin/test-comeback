import { http } from '@/helpers/api/client';
import { ENDPOINTS } from '@/helpers/api/endpoints';
import type { AuthResponse, LoginRequest } from '@/types/models/auth';
import type { User } from '@/types/models/user';

export const authApi = {
  login: (body: LoginRequest) => http.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, { body }),
  me: () => http.get<User>(ENDPOINTS.AUTH.ME),
  logout: () => http.post<void>(ENDPOINTS.AUTH.LOGOUT),
};
