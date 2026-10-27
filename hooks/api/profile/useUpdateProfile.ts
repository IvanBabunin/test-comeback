import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileApi } from '@/api/profile';
import { queryKeys } from '@/helpers/api/query-keys';
import { useAuthStore } from '@/store/auth';

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: profileApi.update,
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.profile.detail(), user);
      setUser(user);
    },
  });
}
