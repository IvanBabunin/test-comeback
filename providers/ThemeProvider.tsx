import type { ReactNode } from 'react';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from 'expo-router/react-navigation';

import { theme, ThemeContext } from '@/theme';

// Макет визначає лише світлу тему.
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.surface,
    text: theme.colors.text,
    border: theme.colors.border,
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}
