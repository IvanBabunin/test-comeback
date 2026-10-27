import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { EmptyState, Screen } from '@/components/shared/layout';
import { Text } from '@/components/shared/ui';
import { ROUTES } from '@/helpers/routes';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <EmptyState
        title={t('notFound.title')}
        action={
          <Link href={ROUTES.HOME}>
            <Text color="primary">{t('notFound.back')}</Text>
          </Link>
        }
      />
    </Screen>
  );
}
