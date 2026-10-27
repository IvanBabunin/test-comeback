import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

/** Нижній відступ списку під плаваючий таб-бар. */
export function useTabBarInset() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return insets.bottom + theme.layout.tabBarHeight + theme.spacing.xl;
}
