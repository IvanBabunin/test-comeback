import { Heart } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { makeStyles, useTheme } from '@/theme';

type FavoriteButtonProps = {
  active: boolean;
  onToggle: () => void;
  accessibilityLabel: string;
  /** card — 32 в картці списку, overlay — 44 поверх фото */
  variant?: 'card' | 'overlay';
};

export function FavoriteButton({
  active,
  onToggle,
  accessibilityLabel,
  variant = 'card',
}: FavoriteButtonProps) {
  const styles = useStyles();
  const theme = useTheme();
  const isCard = variant === 'card';
  // Кнопка в картці менша за 44, тож добираємо зону дотику через hitSlop.
  const slop = isCard ? (theme.layout.minTouch - 32) / 2 : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: active }}
      hitSlop={slop}
      onPress={onToggle}
      style={({ pressed }) => [
        isCard ? styles.card : styles.overlay,
        isCard && active && styles.cardActive,
        pressed && styles.pressed,
      ]}
    >
      <Heart
        size={isCard ? 16 : 22}
        strokeWidth={2}
        color={active ? theme.colors.favorite : isCard ? theme.colors.textSecondary : theme.colors.text}
        fill={active ? theme.colors.favorite : 'transparent'}
      />
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  card: {
    width: 32,
    height: 32,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  cardActive: { backgroundColor: t.colors.favoriteTint, borderColor: t.colors.favoriteTint },
  overlay: {
    width: t.layout.minTouch,
    height: t.layout.minTouch,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.surface,
  },
  pressed: { opacity: 0.7 },
}));
