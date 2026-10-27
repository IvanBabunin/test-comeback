import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme, type Colors, type Theme } from '@/theme';

type TextProps = RNTextProps & {
  variant?: keyof Theme['typography'];
  color?: keyof Colors;
  align?: 'left' | 'center' | 'right';
};

export function Text({ variant = 'body', color = 'text', align, style, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <RNText
      style={[theme.typography[variant], { color: theme.colors[color], textAlign: align }, style]}
      {...props}
    />
  );
}
