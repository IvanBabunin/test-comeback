import { Heart } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

type FavoritesHeaderProps = {
  /** undefined — ще завантажується */
  count?: number;
};

export function FavoritesHeader({ count }: FavoritesHeaderProps) {
  const { t } = useTranslation('favorites');
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.texts}>
        <Text variant="heading" accessibilityRole="header">
          {t('title')}
        </Text>
        <Text color="textSecondary">{t('subtitle')}</Text>
      </View>
      {count !== undefined && count > 0 ? (
        <View style={styles.pill}>
          <Heart size={12} color={theme.colors.favorite} fill={theme.colors.favorite} />
          <Text variant="caption" color="favorite">
            {t('count', { count })}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.spacing.md },
  texts: { gap: t.spacing.xs },
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.xs,
    paddingHorizontal: t.spacing.sm,
    paddingVertical: t.spacing.xs,
    borderRadius: t.radius.badge,
    backgroundColor: t.colors.favoriteTint,
  },
}));
