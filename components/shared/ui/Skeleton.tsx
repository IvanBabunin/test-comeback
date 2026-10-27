import { useEffect } from 'react';
import type { DimensionValue, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { makeStyles } from '@/theme';

type SkeletonProps = {
  width?: DimensionValue;
  height: number;
  radius?: number;
  style?: ViewStyle;
};

export function Skeleton({ width = '100%', height, radius, style }: SkeletonProps) {
  const styles = useStyles();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 800 }), -1, true);
  }, [opacity]);

  const animated = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.root, { width, height }, radius !== undefined && { borderRadius: radius }, style, animated]}
    />
  );
}

const useStyles = makeStyles((t) => ({
  root: { backgroundColor: t.colors.skeleton, borderRadius: t.radius.badge },
}));
