import { http } from '@/helpers/api/client';
import { ENDPOINTS } from '@/helpers/api/endpoints';
import { logger } from '@/helpers/logger';
import { eventSchema, type Event } from '@/types/models/event';

// mockapi публічний і спільний: один зіпсований запис не має ламати весь список.
export function parseEvents(payload: unknown): Event[] {
  if (!Array.isArray(payload)) throw new Error('Unexpected events payload');
  return payload.flatMap((item) => {
    const result = eventSchema.safeParse(item);
    if (result.success) return [result.data];
    logger.warn('Skipping invalid event', result.error.issues);
    return [];
  });
}

export const eventsApi = {
  list: async () => parseEvents(await http.get<unknown>(ENDPOINTS.EVENTS.ROOT)),
  update: async (event: Event) =>
    eventSchema.parse(
      await http.put<unknown>(ENDPOINTS.EVENTS.BY_ID(event.id), { body: event }),
    ),
};
