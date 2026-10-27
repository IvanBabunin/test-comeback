import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient, subscribeAppFocus } from '@/helpers/query-client';
import { deviceLanguage, i18n } from '@/i18n';
import { useSettingsStore } from '@/store/settings';

import { ThemeProvider } from './ThemeProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  const language = useSettingsStore((s) => s.language);

  useEffect(() => subscribeAppFocus(), []);

  useEffect(() => {
    void i18n.changeLanguage(language ?? deviceLanguage());
  }, [language]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <ThemeProvider>
              <StatusBar style="auto" />
              {children}
            </ThemeProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
