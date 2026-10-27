import { useTranslation } from 'react-i18next';

import { EmptyState, Screen } from '@/components/shared/layout';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <Screen>
      <EmptyState title={t('home.empty')} />
    </Screen>
  );
}
