import { CloudAlert, RefreshCw } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Button } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

import { EmptyState } from './EmptyState';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  const styles = useStyles();
  const theme = useTheme();
  return (
    <EmptyState
      title={title ?? t('errors.title')}
      description={message ?? t('errors.generic')}
      icon={
        <View style={styles.icon}>
          <CloudAlert size={26} color={theme.colors.danger} strokeWidth={2} />
        </View>
      }
      action={
        onRetry ? (
          <Button
            title={t('actions.retry')}
            icon={<RefreshCw size={18} color={theme.colors.onPrimary} strokeWidth={2.2} />}
            onPress={onRetry}
          />
        ) : null
      }
    />
  );
}

const useStyles = makeStyles((t) => ({
  icon: {
    width: 60,
    height: 60,
    borderRadius: t.radius.card,
    backgroundColor: t.colors.dangerTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
