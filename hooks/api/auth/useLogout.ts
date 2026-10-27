import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/api/auth';
import { useAuthStore } from '@/store/auth';

export function useLogout() {
  const queryClient = useQueryClient();
  const signOut = useAuthStore((s) => s.signOut);

  return useMutation({
    mutationFn: authApi.logout,
    // Виходимо локально навіть якщо сервер не відповів.
    onSettled: async () => {
      await signOut();
      queryClient.clear();
    },
  });
}
