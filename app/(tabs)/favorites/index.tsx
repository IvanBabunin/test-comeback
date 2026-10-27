import { useIsMutating } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { FavoritesHeader } from '@/components/screens/favorites/FavoritesHeader';
import { EventCard, EventCardSkeleton } from '@/components/shared/events';
import { EmptyIcon, EmptyState, ErrorState, Screen } from '@/components/shared/layout';
import { Button } from '@/components/shared/ui';
import { queryKeys } from '@/helpers/api/query-keys';
import { ROUTES } from '@/helpers/routes';
import { useFavoriteEvents } from '@/hooks/api/events/useFavoriteEvents';
import { useSetFavorite } from '@/hooks/api/events/useSetFavorite';
import { useTabBarInset } from '@/hooks/ui/useTabBarInset';
import { makeStyles, useTheme } from '@/theme';

export default function FavoritesScreen() {
  const { t } = useTranslation('favorites');
  const styles = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const { data, isPending, isError, refetch } = useFavoriteEvents();
  const { mutate: setFavorite } = useSetFavorite();
  const favoritePending = useIsMutating({ mutationKey: queryKeys.events.setFavorite() }) > 0;
  const bottomInset = useTabBarInset();
  const [refreshing, setRefreshing] = useState(false);
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

  const renderEmpty = () => {
    if (isPending) {
      return (
        <View style={styles.skeletons}>
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </View>
      );
    }
    if (showError) return <ErrorState onRetry={() => void refetch()} />;
    return (
      <EmptyState
        title={t('empty.title')}
        description={t('empty.description')}
        icon={
          <EmptyIcon>
            <Heart size={28} color={theme.colors.favorite} strokeWidth={2} />
          </EmptyIcon>
        }
        action={<Button title={t('empty.action')} onPress={() => router.navigate(ROUTES.DISCOVER)} />}
      />
    );
  };

  return (
    <Screen edges={['top']} padded={false}>
      <Animated.FlatList
        data={data ?? []}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => <EventCard event={item} onToggleFavorite={onToggleFavorite} />}
        itemLayoutAnimation={LinearTransition}
        ListHeaderComponent={<FavoritesHeader count={data?.length} />}
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={renderEmpty()}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={[styles.content, { paddingBottom: bottomInset }]}
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

function Separator() {
  const styles = useStyles();
  return <View style={styles.separator} />;
}

const useStyles = makeStyles((t) => ({
  content: { paddingHorizontal: t.spacing.lg, paddingTop: t.spacing.xs },
  header: { marginBottom: t.spacing.xl },
  skeletons: { gap: t.spacing.sm },
  separator: { height: t.spacing.sm },
}));
