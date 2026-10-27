import { Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { makeStyles, useTheme } from '@/theme';

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  clearLabel: string;
};

export function SearchInput({ value, onChangeText, placeholder, clearLabel }: SearchInputProps) {
  const styles = useStyles();
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.root, (focused || value !== '') && styles.focused]}>
      <Search size={18} color={theme.colors.textSecondary} strokeWidth={2} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
        style={styles.input}
      />
      {value !== '' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
          hitSlop={theme.spacing.sm}
          onPress={() => onChangeText('')}
          style={styles.clear}
        >
          <X size={12} color={theme.colors.text} strokeWidth={3} />
        </Pressable>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    flex: 1,
    height: t.layout.controlHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.input,
    borderWidth: 1,
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
    boxShadow: t.shadows.card,
  },
  focused: { borderColor: t.colors.primary },
  input: { flex: 1, height: '100%', color: t.colors.text, ...t.typography.body, lineHeight: undefined },
  clear: {
    width: 20,
    height: 20,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.border,
  },
}));
