import { useTranslation } from 'react-i18next';

import { Button } from '@/components/shared/ui';

import { EmptyState } from './EmptyState';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <EmptyState
      title={message ?? t('errors.generic')}
      action={
        onRetry ? <Button title={t('actions.retry')} variant="secondary" onPress={onRetry} /> : null
      }
    />
  );
}
