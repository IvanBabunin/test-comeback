/**
 * Дизайн-токени. Компоненти беруть кольори й відступи ТІЛЬКИ звідси.
 * Під кожен проєкт міняєш палітру тут — решта підхопиться.
 */
const palette = {
  ink: '#15171A',
  graphite: '#2A2E33',
  slate: '#6B7280',
  mist: '#E5E7EB',
  paper: '#FFFFFF',
  night: '#101214',
  accent: '#2F6FEB',
  accentDark: '#5B8EF0',
  success: '#1F9D55',
  warning: '#C27803',
  danger: '#D93636',
};

export const lightColors = {
  background: palette.paper,
  surface: '#F6F7F9',
  text: palette.ink,
  textMuted: palette.slate,
  border: palette.mist,
  primary: palette.accent,
  onPrimary: palette.paper,
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
};

export type Colors = typeof lightColors;

export const darkColors: Colors = {
  background: palette.night,
  surface: '#1A1D21',
  text: '#F3F4F6',
  textMuted: '#9CA3AF',
  border: palette.graphite,
  primary: palette.accentDark,
  onPrimary: palette.night,
  success: '#34C77B',
  warning: '#E3A008',
  danger: '#F05252',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  full: 999,
} as const;

export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  subtitle: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '500' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
} as const;

export type Theme = {
  dark: boolean;
  colors: Colors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
};

export const lightTheme: Theme = { dark: false, colors: lightColors, spacing, radius, typography };
export const darkTheme: Theme = { dark: true, colors: darkColors, spacing, radius, typography };
