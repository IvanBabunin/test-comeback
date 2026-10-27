import { focusManager, QueryClient } from '@tanstack/react-query';
import { AppState, Platform } from 'react-native';

import { isApiError } from '@/helpers/api/errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // 4xx не повторюємо: повтор не виправить неправильний запит.
      retry: (failureCount, error) =>
        !(isApiError(error) && error.isClientError) && failureCount < 2,
    },
  },
});

/** Рефетч при поверненні застосунку з фону. Повертає функцію відписки. */
export function subscribeAppFocus() {
  const sub = AppState.addEventListener('change', (status) => {
    if (Platform.OS !== 'web') focusManager.setFocused(status === 'active');
  });
  return () => sub.remove();
}
