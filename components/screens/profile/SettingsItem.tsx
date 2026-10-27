import { Pressable } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles } from '@/theme';

type SettingsItemProps = {
  title: string;
  value?: string;
  onPress: () => void;
};

export function SettingsItem({ title, value, onPress }: SettingsItemProps) {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <Text>{title}</Text>
      {value ? <Text color="textMuted">{value}</Text> : null}
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    minHeight: 52,
    paddingHorizontal: t.spacing.lg,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: { opacity: 0.8 },
}));
