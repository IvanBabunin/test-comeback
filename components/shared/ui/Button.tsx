import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { makeStyles, useTheme } from '@/theme';

import { Text } from './Text';

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
};

export function Button({
  title,
  icon,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const styles = useStyles();
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const textColor = variant === 'primary' ? 'onPrimary' : 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={(state) => [
        styles.base,
        styles[variant],
        state.pressed && styles.pressed,
        isDisabled && styles.disabled,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[textColor]} />
      ) : (
        <>
          {icon}
          <Text variant="label" color={textColor}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  base: {
    minHeight: t.layout.minTouch,
    paddingHorizontal: t.spacing.xl,
    borderRadius: t.radius.thumb,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.xs,
  },
  primary: { backgroundColor: t.colors.primary, boxShadow: t.shadows.primary },
  secondary: { borderWidth: 1, borderColor: t.colors.border, backgroundColor: t.colors.surface },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
}));
