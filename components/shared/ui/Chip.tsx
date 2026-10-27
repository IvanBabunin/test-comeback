import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet } from 'react-native';

import { gradients, makeStyles } from '@/theme';

import { Text } from './Text';

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.root,
        selected ? styles.selected : styles.idle,
        pressed && styles.pressed,
      ]}
    >
      {selected ? (
        <LinearGradient
          colors={gradients.chip}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.gradient]}
        />
      ) : null}
      <Text variant="label" color={selected ? 'onPrimary' : 'text'}>
        {label}
      </Text>
    </Pressable>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    height: 40,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  idle: { backgroundColor: t.colors.surface, borderWidth: 1, borderColor: t.colors.border },
  selected: { boxShadow: t.shadows.primary },
  gradient: { borderRadius: t.radius.full },
  pressed: { opacity: 0.85 },
}));
