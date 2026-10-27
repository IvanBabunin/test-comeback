import { View } from 'react-native';

import { Skeleton } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

export function FeaturedEventSkeleton() {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.card}>
        <Skeleton
          width={44}
          height={44}
          radius={theme.radius.full}
          style={styles.favorite}
        />
        <View style={styles.bottom}>
          <View style={styles.lines}>
            <Skeleton width={48} height={20} />
            <Skeleton width="80%" height={18} />
            <Skeleton width="50%" height={12} />
          </View>
          <Skeleton width={56} height={34} radius={theme.radius.price} />
        </View>
      </View>
      <View style={styles.date} />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  card: {
    height: t.layout.featuredHeight + 4,
    borderRadius: t.radius.panel,
    backgroundColor: t.colors.border,
    padding: t.spacing.md,
    justifyContent: 'flex-end',
  },
  favorite: { position: 'absolute', top: t.spacing.sm, right: t.spacing.sm, backgroundColor: t.colors.background },
  bottom: { flexDirection: 'row', alignItems: 'flex-end', gap: t.spacing.sm },
  lines: { flex: 1, gap: t.spacing.xs },
  date: {
    position: 'absolute',
    top: -10,
    left: -8,
    width: 52,
    height: 54,
    borderRadius: t.radius.thumb,
    backgroundColor: t.colors.surface,
    boxShadow: t.shadows.card,
  },
}));
