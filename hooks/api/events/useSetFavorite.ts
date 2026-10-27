import { useMutation, useQueryClient } from '@tanstack/react-query';

import { eventsApi } from '@/api/events';
import { queryKeys } from '@/helpers/api/query-keys';
import { i18n } from '@/i18n';
import { useToastStore } from '@/store/toast';
import type { Event } from '@/types/models/event';

type Variables = { id: string; isFavorite: boolean };

// PUT-и для однієї події йдуть по черзі: інакше швидкі тапи можуть дійти до сервера
// в іншому порядку, і на сервері залишиться не останнє значення.
const queues = new Map<string, Promise<unknown>>();

function enqueue<T>(id: string, task: () => Promise<T>): Promise<T> {
  const next = (queues.get(id) ?? Promise.resolve()).catch(() => undefined).then(task);
  queues.set(id, next);
  const cleanup = () => {
    if (queues.get(id) === next) queues.delete(id);
  };
  next.then(cleanup, cleanup);
  return next;
}

const patchFavorite = (events: Event[] | undefined, id: string, isFavorite: boolean) =>
  events?.map((event) => (event.id === id ? { ...event, isFavorite } : event));

export function useSetFavorite() {
  const queryClient = useQueryClient();
  const listKey = queryKeys.events.list();
  const mutationKey = queryKeys.events.setFavorite();

  return useMutation({
    mutationKey,
    mutationFn: ({ id, isFavorite }: Variables) =>
      enqueue(id, () => {
        const event = queryClient.getQueryData<Event[]>(listKey)?.find((e) => e.id === id);
        if (!event) throw new Error(`Event ${id} is not in cache`);
        return eventsApi.update({ ...event, isFavorite });
      }),
    onMutate: async ({ id, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const event = queryClient.getQueryData<Event[]>(listKey)?.find((e) => e.id === id);
      if (!event) return undefined;
      queryClient.setQueryData<Event[]>(listKey, (old) => patchFavorite(old, id, isFavorite));
      return { previous: event.isFavorite };
    },
    onError: (_error, { id, isFavorite }, context) => {
      // Відкочуємо лише цю подію і лише якщо новіший тап її ще не змінив.
      if (context) {
        queryClient.setQueryData<Event[]>(listKey, (old) =>
          old?.map((event) =>
            event.id === id && event.isFavorite === isFavorite
              ? { ...event, isFavorite: context.previous }
              : event,
          ),
        );
      }
      useToastStore.getState().show(i18n.t('errors.favorite'));
    },
    onSettled: () => {
      // Мутація, що завершується, ще рахується в isMutating, тому порівнюємо з 1.
      if (queryClient.isMutating({ mutationKey }) === 1) {
        void queryClient.invalidateQueries({ queryKey: listKey });
      }
    },
  });
}
