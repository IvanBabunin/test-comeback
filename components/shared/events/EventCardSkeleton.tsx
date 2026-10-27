import { View } from 'react-native';

import { Skeleton } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

export function EventCardSkeleton() {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View style={styles.root} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Skeleton width={theme.layout.thumb} height={theme.layout.thumb} radius={theme.radius.thumb} />
      <View style={styles.body}>
        <View style={styles.top}>
          <Skeleton width={48} height={20} />
          <Skeleton width={32} height={32} radius={theme.radius.full} />
        </View>
        <Skeleton width="85%" height={16} />
        <Skeleton width="55%" height={12} />
      </View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    height: t.layout.cardHeight,
    flexDirection: 'row',
    gap: t.spacing.sm,
    padding: t.spacing.sm,
    borderRadius: t.radius.card,
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  body: { flex: 1, justifyContent: 'space-between' },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
}));
