export const ENDPOINTS = {
  EVENTS: {
    ROOT: '/events',
    BY_ID: (id: string) => `/events/${id}`,
  },
} as const;
