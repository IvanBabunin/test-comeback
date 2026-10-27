import { forwardRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { makeStyles, useTheme } from '@/theme';

import { Text } from './Text';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, style, ...props },
  ref,
) {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Text variant="label" color="textMuted">
          {label}
        </Text>
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? (
        <Text variant="caption" color="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
});

const useStyles = makeStyles((t) => ({
  wrapper: { gap: t.spacing.xs },
  input: {
    minHeight: 48,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
    color: t.colors.text,
    ...t.typography.body,
  },
  inputError: { borderColor: t.colors.danger },
}));
