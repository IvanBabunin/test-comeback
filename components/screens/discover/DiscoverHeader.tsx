import { Bell, ChevronDown, MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { IconButton, Text } from '@/components/shared/ui';
import { makeStyles, useTheme } from '@/theme';

// Локація і дзвіночок — лише UI за завданням.
export function DiscoverHeader() {
  const { t } = useTranslation('discover');
  const styles = useStyles();
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('location.a11y', { city: t('location.city') })}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text variant="caption" color="textSecondary">
            {t('location.label')}
          </Text>
          <View style={styles.location}>
            <MapPin size={16} color={theme.colors.primary} strokeWidth={2.2} />
            <Text variant="title">{t('location.city')}</Text>
            <ChevronDown size={16} color={theme.colors.textMuted} strokeWidth={2.2} />
          </View>
        </Pressable>
        <View>
          <IconButton
            accessibilityLabel={t('notifications')}
            icon={<Bell size={20} color={theme.colors.text} strokeWidth={2} />}
          />
          <View style={styles.bellDot} />
        </View>
      </View>
      <View style={styles.hero}>
        <Text variant="heading" accessibilityRole="header">
          {t('hero.line1')}
          {'\n'}
          <Text variant="heading" color="primary">
            {t('hero.line2')}
          </Text>
        </Text>
        <Text color="textSecondary">{t('subtitle')}</Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: { gap: t.spacing.xl },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  location: { flexDirection: 'row', alignItems: 'center', gap: t.spacing.xxs, marginTop: 2 },
  bellDot: {
    position: 'absolute',
    top: 12,
    right: 13,
    width: 8,
    height: 8,
    borderRadius: t.radius.full,
    backgroundColor: t.colors.favorite,
    borderWidth: 1.5,
    borderColor: t.colors.surface,
  },
  hero: { gap: t.spacing.xs },
  pressed: { opacity: 0.6 },
}));
