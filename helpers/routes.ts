export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  SETTINGS: '/profile/settings',
  LANGUAGE: '/language',
  DETAILS: (id: string) => ({ pathname: '/details/[id]', params: { id } }) as const,
} as const;
