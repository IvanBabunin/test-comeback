import type { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { makeStyles } from '@/theme';

type IconButtonProps = {
  icon: ReactNode;
  accessibilityLabel: string;
  onPress?: () => void;
  variant?: 'light' | 'dark';
};

export function IconButton({ icon, accessibilityLabel, onPress, variant = 'light' }: IconButtonProps) {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [styles.root, styles[variant], pressed && styles.pressed]}
    >
      {icon}
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    width: t.layout.controlHeight,
    height: t.layout.controlHeight,
    borderRadius: t.radius.thumb,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.border,
    boxShadow: t.shadows.card,
  },
  dark: { backgroundColor: t.colors.dark },
  pressed: { opacity: 0.7 },
}));
