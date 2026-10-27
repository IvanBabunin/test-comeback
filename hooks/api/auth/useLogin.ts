import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/api/auth';
import { queryKeys } from '@/helpers/api/query-keys';
import { useAuthStore } from '@/store/auth';

export function useLogin() {
  const queryClient = useQueryClient();
  const signIn = useAuthStore((s) => s.signIn);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async ({ accessToken, user }) => {
      await signIn(accessToken, user);
      queryClient.setQueryData(queryKeys.auth.me(), user);
    },
  });
}
