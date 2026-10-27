import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles } from '@/theme';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <Text variant="subtitle" align="center">
        {title}
      </Text>
      {description ? (
        <Text color="textMuted" align="center">
          {description}
        </Text>
      ) : null}
      {action}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.md,
    padding: t.spacing.xl,
  },
}));
