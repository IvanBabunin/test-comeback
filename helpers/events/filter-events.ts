import type { Event } from '@/types/models/event';

type EventFilters = {
  query: string;
  /** null = усі категорії */
  category: string | null;
};

export function filterEvents(events: Event[], { query, category }: EventFilters) {
  const needle = query.trim().toLowerCase();
  return events.filter(
    (event) =>
      (category === null || event.category === category) &&
      (needle === '' || event.title.toLowerCase().includes(needle)),
  );
}

/** Унікальні категорії в порядку першої появи. */
export function getCategories(events: Event[]) {
  return [...new Set(events.map((event) => event.category))];
}

export function splitFeatured(events: Event[]) {
  const featured = events.find((event) => event.isFeatured) ?? null;
  return { featured, upcoming: events.filter((event) => event !== featured) };
}
