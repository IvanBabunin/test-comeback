import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from './context';
import type { Theme } from './tokens';

/**
 * const useStyles = makeStyles((t) => ({ box: { padding: t.spacing.lg } }));
 * const styles = useStyles();
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(factory: (theme: Theme) => T) {
  return function useStyles() {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
