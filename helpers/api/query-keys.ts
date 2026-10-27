/**
 * Усі ключі TanStack Query в одному місці. Новий домен = новий блок.
 * Ключі — функції, щоб параметри завжди були частиною ключа.
 */
export const queryKeys = {
  auth: {
    me: () => ['auth', 'me'] as const,
  },
  profile: {
    all: () => ['profile'] as const,
    detail: () => ['profile', 'detail'] as const,
  },
};
