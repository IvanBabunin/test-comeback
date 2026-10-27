import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ProfileLayout() {
  const { t } = useTranslation('profile');
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: t('title') }} />
      <Stack.Screen name="settings" options={{ title: t('settings') }} />
    </Stack>
  );
}
