import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { SettingsItem } from '@/components/screens/profile/SettingsItem';
import { Screen } from '@/components/shared/layout';
import { ROUTES } from '@/helpers/routes';
import { useSettingsStore } from '@/store/settings';

export default function SettingsScreen() {
  const { t } = useTranslation(['common', 'profile']);
  const router = useRouter();
  const language = useSettingsStore((s) => s.language);

  return (
    <Screen scroll>
      <SettingsItem
        title={t('profile:language')}
        value={t(language ? `language.${language}` : 'language.system')}
        onPress={() => router.push(ROUTES.LANGUAGE)}
      />
    </Screen>
  );
}
