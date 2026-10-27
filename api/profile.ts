import { http } from '@/helpers/api/client';
import { ENDPOINTS } from '@/helpers/api/endpoints';
import type { UpdateProfileRequest, User } from '@/types/models/user';

export const profileApi = {
  get: () => http.get<User>(ENDPOINTS.PROFILE.ROOT),
  update: (body: UpdateProfileRequest) => http.patch<User>(ENDPOINTS.PROFILE.ROOT, { body }),
};
