import type { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from 'expo-router/react-navigation';

import { useSettingsStore } from '@/store/settings';
import { darkTheme, lightTheme, ThemeContext } from '@/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const mode = useSettingsStore((s) => s.themeMode);
  const isDark = mode === 'system' ? system === 'dark' : mode === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  // Тема навігації (хедери, таб-бар) бере кольори з наших токенів.
  const base = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.background,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
