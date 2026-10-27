import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ProfileHeader } from '@/components/screens/profile/ProfileHeader';
import { SettingsItem } from '@/components/screens/profile/SettingsItem';
import { Screen } from '@/components/shared/layout';
import { Button } from '@/components/shared/ui';
import { ROUTES } from '@/helpers/routes';
import { useLogout } from '@/hooks/api/auth/useLogout';
import { useAuthStore } from '@/store/auth';

export default function ProfileScreen() {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();

  return (
    <Screen scroll>
      {user ? <ProfileHeader user={user} /> : null}
      <SettingsItem title={t('settings')} onPress={() => router.push(ROUTES.SETTINGS)} />
      <Button
        title={t('logout')}
        variant="secondary"
        loading={logout.isPending}
        onPress={() => logout.mutate()}
      />
    </Screen>
  );
}
