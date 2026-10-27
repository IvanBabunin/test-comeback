import { useEffect } from 'react';

import { authApi } from '@/api/auth';
import { logger } from '@/helpers/logger';
import { tokenStorage } from '@/helpers/storage';
import { useAuthStore } from '@/store/auth';

/** Один раз при старті: є токен → перевіряємо його через /auth/me. */
export function useRestoreSession() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { signIn, signOut } = useAuthStore.getState();
      const token = await tokenStorage.get();
      if (!token) return signOut();
      try {
        const user = await authApi.me();
        if (!cancelled) await signIn(token, user);
      } catch (error) {
        logger.warn('Session restore failed', error);
        if (!cancelled) await signOut();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}
