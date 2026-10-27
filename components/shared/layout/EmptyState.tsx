import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles } from '@/theme';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      {icon}
      <View style={styles.texts}>
        <Text variant="title" align="center" accessibilityRole="header">
          {title}
        </Text>
        {description ? (
          <Text color="textMuted" align="center">
            {description}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.lg,
    paddingHorizontal: t.spacing.xl,
    paddingVertical: t.spacing.xxxl,
  },
  texts: { alignItems: 'center', gap: t.spacing.xs },
}));
