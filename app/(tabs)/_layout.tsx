import { Tabs } from 'expo-router';
import { Compass, Heart } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFavoriteEvents } from '@/hooks/api/events/useFavoriteEvents';
import { useTheme } from '@/theme';

// Кастомний вигляд таб-бару (радіус, тінь, колір бейджа) з макету — NativeTabs так не стилізуються.
export default function TabsLayout() {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { data: favorites } = useFavoriteEvents();
  const favoritesCount = favorites?.length ?? 0;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: theme.typography.caption,
        tabBarStyle: {
          position: 'absolute',
          height: theme.layout.tabBarHeight + insets.bottom,
          paddingTop: theme.spacing.xs,
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          borderTopLeftRadius: theme.radius.tabBar,
          borderTopRightRadius: theme.radius.tabBar,
          boxShadow: theme.shadows.tabBar,
        },
        tabBarBadgeStyle: {
          backgroundColor: theme.colors.favorite,
          color: theme.colors.onPrimary,
          ...theme.typography.caption,
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(discover)"
        options={{
          title: t('tabs.discover'),
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('tabs.favorites'),
          tabBarBadge: favoritesCount > 0 ? favoritesCount : undefined,
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
