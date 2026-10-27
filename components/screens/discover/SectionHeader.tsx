import { Pressable, View } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles } from '@/theme';

type SectionHeaderProps = {
  title: string;
  /** "See all" — лише UI за завданням */
  actionLabel?: string;
};

export function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <Text variant="section" accessibilityRole="header">
        {title}
      </Text>
      {actionLabel ? (
        <Pressable accessibilityRole="button" hitSlop={10} style={({ pressed }) => pressed && styles.pressed}>
          <Text variant="label" color="primary">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const useStyles = makeStyles(() => ({
  root: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pressed: { opacity: 0.6 },
}));
