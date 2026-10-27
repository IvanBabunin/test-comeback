/**
 * Усі ключі TanStack Query в одному місці. Новий домен = новий блок.
 * Ключі — функції, щоб параметри завжди були частиною ключа.
 */
export const queryKeys = {
  events: {
    all: () => ['events'] as const,
    list: () => ['events', 'list'] as const,
    setFavorite: () => ['events', 'setFavorite'] as const,
  },
};
