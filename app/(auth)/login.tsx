import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/components/screens/auth/LoginForm';
import { Screen } from '@/components/shared/layout';
import { Text } from '@/components/shared/ui';

export default function LoginScreen() {
  const { t } = useTranslation('auth');
  return (
    <Screen scroll edges={['top', 'bottom']}>
      <Text variant="title">{t('login.title')}</Text>
      <LoginForm />
    </Screen>
  );
}
