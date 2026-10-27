import { useIsMutating } from '@tanstack/react-query';
import { SearchX, SlidersHorizontal } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { CategoryChips } from '@/components/screens/discover/CategoryChips';
import { DiscoverHeader } from '@/components/screens/discover/DiscoverHeader';
import { FeaturedEventCard } from '@/components/screens/discover/FeaturedEventCard';
import { FeaturedEventSkeleton } from '@/components/screens/discover/FeaturedEventSkeleton';
import { SectionHeader } from '@/components/screens/discover/SectionHeader';
import { EventCard, EventCardSkeleton } from '@/components/shared/events';
import { EmptyIcon, EmptyState, ErrorState, Screen } from '@/components/shared/layout';
import { Button, IconButton, SearchInput } from '@/components/shared/ui';
import { queryKeys } from '@/helpers/api/query-keys';
import { filterEvents, getCategories, splitFeatured } from '@/helpers/events/filter-events';
import { useEvents } from '@/hooks/api/events/useEvents';
import { useSetFavorite } from '@/hooks/api/events/useSetFavorite';
import { useTabBarInset } from '@/hooks/ui/useTabBarInset';
import { theme } from '@/theme';
import type { Event } from '@/types/models/event';

export default function DiscoverScreen() {
  const { t } = useTranslation('discover');
  const { data, isPending, isError, refetch } = useEvents();
  const { mutate: setFavorite } = useSetFavorite();
  const favoritePending = useIsMutating({ mutationKey: queryKeys.events.setFavorite() }) > 0;
  const bottomInset = useTabBarInset();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const events = useMemo(() => data ?? [], [data]);
  const categories = useMemo(() => getCategories(events), [events]);
  const filtered = useMemo(() => filterEvents(events, { query, category }), [events, query, category]);
  const { featured, upcoming } = useMemo(() => splitFeatured(filtered), [filtered]);
  const showError = isError && !data;

  const onToggleFavorite = useCallback(
    (id: string, isFavorite: boolean) => setFavorite({ id, isFavorite }),
    [setFavorite],
  );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);
  const clearFilters = useCallback(() => {
    setQuery('');
    setCategory(null);
  }, []);

  const header = (
    <View style={styles.header}>
      <DiscoverHeader />
      <View style={styles.searchRow}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          placeholder={t('search.placeholder')}
          clearLabel={t('search.clear')}
        />
        <IconButton
          variant="dark"
          accessibilityLabel={t('filters')}
          icon={<SlidersHorizontal size={20} color={theme.colors.onPrimary} strokeWidth={2} />}
        />
      </View>
      <CategoryChips categories={categories} selected={category} onSelect={setCategory} />
      {featured ? (
        <View style={styles.section}>
          <SectionHeader title={t('featured')} />
          <FeaturedEventCard event={featured} onToggleFavorite={onToggleFavorite} />
        </View>
      ) : null}
      {upcoming.length > 0 ? <SectionHeader title={t('upcoming')} actionLabel={t('seeAll')} /> : null}
    </View>
  );

  const renderEmpty = () => {
    if (isPending) {
      return (
        <View style={styles.section}>
          <SectionHeader title={t('featured')} />
          <FeaturedEventSkeleton />
          <SectionHeader title={t('upcoming')} />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </View>
      );
    }
    if (showError) return <ErrorState onRetry={() => void refetch()} />;
    if (filtered.length > 0) return null;
    if (events.length === 0) {
      return <EmptyState title={t('noEvents.title')} description={t('noEvents.description')} />;
    }
    return (
      <EmptyState
        title={t('empty.title')}
        description={t('empty.description')}
        icon={
          <EmptyIcon>
            <SearchX size={28} color={theme.colors.primary} strokeWidth={2} />
          </EmptyIcon>
        }
        action={<Button title={t('empty.action')} onPress={clearFilters} />}
      />
    );
  };

  return (
    <Screen edges={['top']} padded={false}>
      <FlatList<Event>
        data={isPending || showError ? [] : upcoming}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => <EventCard event={item} onToggleFavorite={onToggleFavorite} />}
        ListHeaderComponent={header}
        ListEmptyComponent={renderEmpty()}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            enabled={!favoritePending}
            tintColor={theme.colors.primary}
          />
        }
      />
    </Screen>
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  content: { paddingHorizontal: theme.spacing.lg, paddingTop: theme.spacing.xs },
  header: { gap: theme.spacing.xl, marginBottom: theme.spacing.md },
  searchRow: { flexDirection: 'row', gap: theme.spacing.sm },
  section: { gap: theme.spacing.md },
  separator: { height: theme.spacing.sm },
});
