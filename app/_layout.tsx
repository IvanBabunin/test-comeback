import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { Toast } from '@/components/shared/ui';
import { AppProviders } from '@/providers/AppProviders';
import { useToastStore } from '@/store/toast';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  // Помилка шрифту не має блокувати застосунок — показуємо із системним шрифтом.
  const ready = loaded || error !== null;
  const toastMessage = useToastStore((s) => s.message);
  const hideToast = useToastStore((s) => s.hide);

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast message={toastMessage} onHide={hideToast} />
    </AppProviders>
  );
}
