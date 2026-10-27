import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { TabBarIcon } from '@/components/shared/layout';

// Кожен таб — окрема папка з _layout (Stack) та index.
// Перший таб у дужках, щоб він відкривався за адресою "/".
export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
