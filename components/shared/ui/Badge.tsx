import { View } from 'react-native';

import { categoryColors, fallbackCategoryColor, makeStyles, useTheme } from '@/theme';

import { Text } from './Text';

type BadgeProps = {
  label: string;
  /** onImage — напівпрозорий бейдж поверх фото */
  variant?: 'category' | 'onImage';
};

export function Badge({ label, variant = 'category' }: BadgeProps) {
  const styles = useStyles();
  const theme = useTheme();
  const tint = categoryColors[label] ?? fallbackCategoryColor;
  const onImage = variant === 'onImage';

  return (
    <View
      style={[styles.root, { backgroundColor: onImage ? theme.colors.overlayChip : tint.background }]}
    >
      <Text variant="caption" style={{ color: onImage ? theme.colors.onPrimary : tint.text }}>
        {label}
      </Text>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    alignSelf: 'flex-start',
    paddingHorizontal: t.spacing.xs,
    paddingVertical: t.spacing.xxs,
    borderRadius: t.radius.badge,
  },
}));
