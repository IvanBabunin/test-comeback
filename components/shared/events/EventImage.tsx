import { Image } from 'expo-image';
import { Ticket } from 'lucide-react-native';
import { useState } from 'react';
import { View, type ImageStyle, type ViewStyle } from 'react-native';

import { Text } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

type EventImageProps = {
  uri?: string;
  style: ImageStyle;
  /** Компактна заглушка для мініатюр списку */
  compact?: boolean;
};

export function EventImage({ uri, style, compact = false }: EventImageProps) {
  const styles = useStyles();
  const theme = useTheme();
  const [failed, setFailed] = useState(false);

  if (!uri || failed) {
    return (
      <View style={[styles.fallback, style as ViewStyle]}>
        <Ticket size={compact ? 22 : 36} color={theme.colors.primary} strokeWidth={2} />
        <Text variant="caption" color="primary" style={styles.brand}>
          EVENTLY
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      contentFit="cover"
      transition={200}
      onError={() => setFailed(true)}
      accessibilityIgnoresInvertColors
    />
  );
}

const useStyles = makeStyles((t) => ({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: t.spacing.xxs,
    backgroundColor: t.colors.primaryTint,
  },
  brand: { letterSpacing: 1.5 },
}));
