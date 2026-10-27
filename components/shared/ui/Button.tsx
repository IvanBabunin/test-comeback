import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';

import { makeStyles, useTheme } from '@/theme';

import { Text } from './Text';

type ButtonProps = Omit<PressableProps, 'children'> & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
};

export function Button({
  title,
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
        <Text variant="label" color={textColor}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  base: {
    minHeight: 48,
    paddingHorizontal: t.spacing.lg,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: t.colors.primary },
  secondary: { borderWidth: 1, borderColor: t.colors.border, backgroundColor: t.colors.surface },
  ghost: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
}));
