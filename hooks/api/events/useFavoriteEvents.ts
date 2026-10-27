import { useQuery } from '@tanstack/react-query';

import { eventsApi } from '@/api/events';
import { queryKeys } from '@/helpers/api/query-keys';
import type { Event } from '@/types/models/event';

const selectFavorites = (events: Event[]) => events.filter((event) => event.isFavorite);

/** Той самий кеш, що й useEvents — тому обидва таби завжди синхронні. */
export function useFavoriteEvents() {
  return useQuery({
    queryKey: queryKeys.events.list(),
    queryFn: eventsApi.list,
    select: selectFavorites,
  });
}
