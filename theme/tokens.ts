/**
 * Дизайн-токени (Figma "Foundations"). Компоненти беруть кольори й відступи ТІЛЬКИ звідси.
 */
const palette = {
  violet: '#7254F3',
  violetLight: '#8378FF',
  sky: '#71C6FF',
  ink: '#181930',
  slate: '#858998',
  graphite: '#6E7286',
  cloud: '#F7F8FC',
  white: '#FFFFFF',
  mist: '#E9EAF1',
  rose: '#F04472',
  emerald: '#25A77B',
  crimson: '#D93A4A',
};

export const colors = {
  background: palette.cloud,
  surface: palette.white,
  text: palette.ink,
  textSecondary: palette.slate,
  textMuted: palette.graphite,
  border: palette.mist,
  primary: palette.violet,
  primaryTint: '#F0EDFE',
  onPrimary: palette.white,
  dark: palette.ink,
  favorite: palette.rose,
  favoriteTint: '#FEEBF0',
  success: palette.emerald,
  successTint: '#E3F5EE',
  danger: palette.crimson,
  dangerTint: '#FDECEE',
  skeleton: palette.mist,
  overlayChip: 'rgba(255, 255, 255, 0.18)',
  backdrop: 'rgba(24, 25, 48, 0.85)',
};

export type Colors = typeof colors;

// Відтінки бейджів категорій не винесені у Foundations — підібрані зі зразків на макеті.
export const categoryColors: Record<string, { background: string; text: string }> = {
  Tech: { background: '#F0EDFE', text: palette.violet },
  Music: { background: '#FEEBF0', text: '#C8295A' },
  Business: { background: '#FFF3DC', text: '#A86A12' },
  Sports: { background: '#E5F1FD', text: '#2B78D0' },
};
export const fallbackCategoryColor = { background: palette.mist, text: palette.graphite };

export const gradients = {
  chip: [palette.violet, palette.violetLight],
  featuredBorder: [palette.violet, palette.sky],
  featuredOverlay: {
    colors: [
      'rgba(24, 25, 48, 0)',
      'rgba(24, 25, 48, 0)',
      'rgba(70, 44, 170, 0.42)',
      'rgba(40, 24, 110, 0.8)',
      'rgba(14, 12, 32, 0.94)',
    ],
    locations: [0, 0.32, 0.56, 0.8, 1],
  },
} as const;

export const shadows = {
  card: '0px 10px 22px rgba(140, 143, 174, 0.18)',
  featured: '0px 14px 26px rgba(56, 40, 140, 0.45)',
  primary: '0px 8px 18px rgba(114, 84, 243, 0.6)',
  tabBar: '0px -6px 24px rgba(140, 143, 174, 0.18)',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 40,
} as const;

export const radius = {
  badge: 8,
  price: 12,
  thumb: 14,
  input: 16,
  card: 18,
  featured: 20,
  panel: 22,
  tabBar: 24,
  full: 999,
} as const;

export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const typography = {
  heading: { fontFamily: fonts.bold, fontSize: 30, lineHeight: 36 },
  section: { fontFamily: fonts.semibold, fontSize: 21, lineHeight: 28 },
  title: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 21 },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 18 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  price: { fontFamily: fonts.bold, fontSize: 15, lineHeight: 20 },
} as const;

export const layout = {
  tabBarHeight: 50,
  minTouch: 44,
  controlHeight: 48,
  cardHeight: 120,
  thumb: 96,
  featuredHeight: 190,
} as const;

export type Theme = {
  colors: Colors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
  layout: typeof layout;
};

export const theme: Theme = { colors, spacing, radius, typography, shadows, layout };
