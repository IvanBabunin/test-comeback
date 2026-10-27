import { Calendar, MapPin } from 'lucide-react-native';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Badge, FavoriteButton, PriceTag, Text } from '@/components/shared/ui';
import { formatDate } from '@/helpers/format/format-date';
import { toLocale } from '@/helpers/format/locale';
import { makeStyles, useTheme } from '@/theme';
import type { Event } from '@/types/models/event';

import { EventImage } from './EventImage';

type EventCardProps = {
  event: Event;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
};

export const EventCard = memo(function EventCard({ event, onToggleFavorite }: EventCardProps) {
  const { t, i18n } = useTranslation();
  const styles = useStyles();
  const theme = useTheme();
  const date = formatDate(event.date, toLocale(i18n.language), { day: 'numeric', month: 'short' });

  return (
    <View style={styles.root}>
      <EventImage uri={event.imageUrl} style={styles.thumb} compact />
      <View style={styles.body}>
        <View style={styles.top}>
          <Badge label={event.category} />
          <FavoriteButton
            active={event.isFavorite}
            onToggle={() => onToggleFavorite(event.id, !event.isFavorite)}
            accessibilityLabel={t(event.isFavorite ? 'favorite.remove' : 'favorite.add', {
              title: event.title,
            })}
          />
        </View>
        <Text variant="title" numberOfLines={2} style={styles.title}>
          {event.title}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.meta}>
            <Calendar size={13} color={theme.colors.textSecondary} strokeWidth={2} />
            <Text variant="caption" color="textSecondary">
              {date}
            </Text>
            <Text variant="caption" color="textSecondary">
              ·
            </Text>
            <MapPin size={13} color={theme.colors.textSecondary} strokeWidth={2} />
            <Text variant="caption" color="textSecondary" numberOfLines={1} style={styles.location}>
              {event.location}
            </Text>
          </View>
          <PriceTag price={event.price} />
        </View>
      </View>
    </View>
  );
});

const useStyles = makeStyles((t) => ({
  root: {
    minHeight: t.layout.cardHeight,
    flexDirection: 'row',
    gap: t.spacing.sm,
    padding: t.spacing.sm,
    borderRadius: t.radius.card,
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.border,
    boxShadow: t.shadows.card,
  },
  thumb: { width: t.layout.thumb, height: t.layout.thumb, borderRadius: t.radius.thumb },
  body: { flex: 1, justifyContent: 'space-between' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { marginTop: t.spacing.xxs },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: t.spacing.xs,
    marginTop: t.spacing.xs,
  },
  meta: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: t.spacing.xxs },
  location: { flexShrink: 1 },
}));
