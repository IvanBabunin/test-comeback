import { Stack, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SettingsItem } from '@/components/screens/profile/SettingsItem';
import { Screen } from '@/components/shared/layout';
import { useSettingsStore, type Language } from '@/store/settings';

const OPTIONS: (Language | null)[] = [null, 'uk', 'en'];

export default function LanguageModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  return (
    <Screen scroll>
      <Stack.Screen options={{ title: t('language.title') }} />
      {OPTIONS.map((option) => (
        <SettingsItem
          key={option ?? 'system'}
          title={t(option ? `language.${option}` : 'language.system')}
          value={option === language ? '✓' : undefined}
          onPress={() => {
            setLanguage(option);
            router.back();
          }}
        />
      ))}
    </Screen>
  );
}
