import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import type { ComponentProps } from 'react';

type IconProps = ComponentProps<typeof MaterialDesignIcons>;

type TabBarIconProps = {
  name: IconProps['name'];
  color: IconProps['color'];
  size?: number;
};

export function TabBarIcon({ name, color, size = 24 }: TabBarIconProps) {
  return <MaterialDesignIcons name={name} color={color} size={size} />;
}
