import { useEffect } from 'react';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { makeStyles, useTheme } from '@/theme';

import { Text } from './Text';

type ToastProps = {
  message: string | null;
  onHide: () => void;
  duration?: number;
};

export function Toast({ message, onHide, duration = 3000 }: ToastProps) {
  const styles = useStyles();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onHide, duration);
    return () => clearTimeout(id);
  }, [message, onHide, duration]);

  if (!message) return null;

  return (
    <Animated.View
      key={message}
      entering={FadeInDown}
      exiting={FadeOutDown}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      pointerEvents="none"
      style={[
        styles.root,
        { bottom: insets.bottom + theme.layout.tabBarHeight + theme.spacing.md },
      ]}
    >
      <Text variant="label" color="onPrimary" align="center">
        {message}
      </Text>
    </Animated.View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    position: 'absolute',
    left: t.spacing.lg,
    right: t.spacing.lg,
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.thumb,
    backgroundColor: t.colors.backdrop,
  },
}));
