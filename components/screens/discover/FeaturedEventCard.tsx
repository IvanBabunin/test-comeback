import { LinearGradient } from 'expo-linear-gradient';
import { MapPin } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { EventImage } from '@/components/shared/events';
import { Badge, FavoriteButton, PriceTag, Text } from '@/components/shared/ui';
import { formatDate } from '@/helpers/format/format-date';
import { toLocale } from '@/helpers/format/locale';
import { gradients, makeStyles, useTheme } from '@/theme';
import type { Event } from '@/types/models/event';

type FeaturedEventCardProps = {
  event: Event;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
};

export function FeaturedEventCard({ event, onToggleFavorite }: FeaturedEventCardProps) {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const theme = useTheme();
  const locale = toLocale(i18n.language);
  const day = formatDate(event.date, locale, { day: 'numeric' });
  const month = formatDate(event.date, locale, { month: 'short' }).replace('.', '').toUpperCase();

  return (
    <View>
      <LinearGradient
        colors={gradients.featuredBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.border}
      >
        <View style={styles.media}>
          <EventImage uri={event.imageUrl} style={StyleSheet.absoluteFill} />
          <LinearGradient
            colors={gradients.featuredOverlay.colors}
            locations={gradients.featuredOverlay.locations}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.favorite}>
            <FavoriteButton
              variant="overlay"
              active={event.isFavorite}
              onToggle={() => onToggleFavorite(event.id, !event.isFavorite)}
              accessibilityLabel={t(event.isFavorite ? 'favorite.remove' : 'favorite.add', {
                title: event.title,
              })}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.info}>
              <Badge label={event.category} variant="onImage" />
              <Text variant="section" color="onPrimary" numberOfLines={2} style={styles.title}>
                {event.title}
              </Text>
              <View style={styles.location}>
                <MapPin size={14} color={theme.colors.onPrimary} strokeWidth={2.2} />
                <Text variant="body" color="onPrimary" numberOfLines={1} style={styles.locationText}>
                  {event.location}
                </Text>
              </View>
            </View>
            <PriceTag price={event.price} variant="onImage" />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.date} accessible accessibilityLabel={`${day} ${month}`}>
        <Text variant="section" style={styles.day}>
          {day}
        </Text>
        <Text variant="caption" color="primary" style={styles.month}>
          {month}
        </Text>
      </View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  border: {
    padding: 2,
    borderRadius: t.radius.panel,
    boxShadow: t.shadows.featured,
  },
  media: {
    height: t.layout.featuredHeight,
    borderRadius: t.radius.featured,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: t.colors.dark,
  },
  favorite: { position: 'absolute', top: t.spacing.sm, right: t.spacing.sm },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: t.spacing.sm,
    padding: t.spacing.md,
  },
  info: { flex: 1, gap: t.spacing.xxs },
  title: { fontSize: 20, lineHeight: 26, fontFamily: t.typography.heading.fontFamily },
  location: { flexDirection: 'row', alignItems: 'center', gap: t.spacing.xxs },
  locationText: { flexShrink: 1 },
  // Бейдж дати навмисно виходить за край картки (−10 зверху, −8 зліва).
  date: {
    position: 'absolute',
    top: -10,
    left: -8,
    minWidth: 52,
    paddingHorizontal: t.spacing.xs,
    paddingVertical: t.spacing.xxs,
    borderRadius: t.radius.thumb,
    backgroundColor: t.colors.surface,
    alignItems: 'center',
    boxShadow: t.shadows.card,
  },
  day: { lineHeight: 24, fontFamily: t.typography.heading.fontFamily },
  month: { fontFamily: t.typography.title.fontFamily, letterSpacing: 0.5 },
}));
