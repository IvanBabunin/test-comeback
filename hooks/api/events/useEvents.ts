import { useQuery } from '@tanstack/react-query';

import { eventsApi } from '@/api/events';
import { queryKeys } from '@/helpers/api/query-keys';

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events.list(),
    queryFn: eventsApi.list,
  });
}
