import type { ReactNode } from 'react';
import { View } from 'react-native';

import { makeStyles } from '@/theme';

/** Ілюстрація порожнього стану: іконка в картці на тонованому колі з декоративними точками. */
export function EmptyIcon({ children }: { children: ReactNode }) {
  const styles = useStyles();
  return (
    <View style={styles.halo}>
      <View style={styles.tile}>{children}</View>
      <View style={[styles.dot, styles.dotAccent]} />
      <View style={[styles.dot, styles.dotSmall]} />
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  halo: {
    width: 104,
    height: 104,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    width: 64,
    height: 64,
    borderRadius: t.radius.card,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: t.shadows.card,
  },
  dot: { position: 'absolute', borderRadius: t.radius.full },
  dotAccent: { top: 10, right: 6, width: 10, height: 10, backgroundColor: t.colors.favorite },
  dotSmall: { bottom: 18, left: 4, width: 7, height: 7, backgroundColor: t.colors.primary, opacity: 0.5 },
}));
