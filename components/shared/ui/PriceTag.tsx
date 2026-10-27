import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { formatPrice } from '@/helpers/format/format-price';
import { toLocale } from '@/helpers/format/locale';
import { makeStyles } from '@/theme';

import { Text } from './Text';

type PriceTagProps = {
  price: number;
  variant?: 'list' | 'onImage';
};

export function PriceTag({ price, variant = 'list' }: PriceTagProps) {
  const { t, i18n } = useTranslation();
  const styles = useStyles();

  if (price === 0) {
    return (
      <View style={[styles.pill, styles.free]}>
        <Text variant="caption" color="success">
          {t('free')}
        </Text>
      </View>
    );
  }

  const label = formatPrice(price, toLocale(i18n.language), 'EUR');
  if (variant === 'onImage') {
    return (
      <View style={[styles.pill, styles.onImage]}>
        <Text variant="price">{label}</Text>
      </View>
    );
  }
  return <Text variant="price">{label}</Text>;
}

const useStyles = makeStyles((t) => ({
  pill: {
    paddingHorizontal: t.spacing.xs,
    paddingVertical: t.spacing.xxs,
    borderRadius: t.radius.badge,
  },
  free: { backgroundColor: t.colors.successTint },
  onImage: {
    paddingHorizontal: t.spacing.sm,
    paddingVertical: t.spacing.xs,
    borderRadius: t.radius.price,
    backgroundColor: t.colors.surface,
  },
}));
