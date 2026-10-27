import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { eventsApi } from '@/api/events';
import { queryKeys } from '@/helpers/api/query-keys';
import { eventsFixture } from '@/helpers/events/events.fixture';
import { useToastStore } from '@/store/toast';
import type { Event } from '@/types/models/event';

import { useSetFavorite } from './useSetFavorite';

jest.mock('@/api/events', () => ({ eventsApi: { list: jest.fn(), update: jest.fn() } }));
jest.mock('@/i18n', () => ({ i18n: { t: (key: string) => key } }));

const update = eventsApi.update as jest.MockedFunction<typeof eventsApi.update>;

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function setup() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false, gcTime: Infinity },
    },
  });
  client.setQueryData(queryKeys.events.list(), eventsFixture);
  const invalidate = jest.spyOn(client, 'invalidateQueries');
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useSetFavorite(), { wrapper });
  const cached = (id: string) =>
    client.getQueryData<Event[]>(queryKeys.events.list())?.find((e) => e.id === id);
  const favoritesCount = () =>
    client.getQueryData<Event[]>(queryKeys.events.list())?.filter((e) => e.isFavorite).length;
  return { client, result, cached, favoritesCount, invalidate };
}

beforeEach(() => {
  update.mockReset();
  useToastStore.setState({ message: null });
});

describe('useSetFavorite', () => {
  it('updates the cache optimistically and sends the full event', async () => {
    const request = deferred<Event>();
    update.mockReturnValue(request.promise);
    const { result, cached, favoritesCount } = setup();
    expect(favoritesCount()).toBe(3);

    act(() => result.current.mutate({ id: '2', isFavorite: true }));

    await waitFor(() => expect(cached('2')?.isFavorite).toBe(true));
    expect(favoritesCount()).toBe(4);

    await waitFor(() => expect(update).toHaveBeenCalledTimes(1));
    expect(update).toHaveBeenCalledWith({ ...eventsFixture[1], isFavorite: true });

    await act(async () => request.resolve({ ...eventsFixture[1], isFavorite: true }));
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(cached('2')?.isFavorite).toBe(true);
  });

  it('rolls back and shows a toast when the request fails', async () => {
    update.mockRejectedValue(new Error('offline'));
    const { result, cached, favoritesCount } = setup();

    act(() => result.current.mutate({ id: '2', isFavorite: true }));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(cached('2')?.isFavorite).toBe(false);
    expect(favoritesCount()).toBe(3);
    expect(useToastStore.getState().message).toBe('errors.favorite');
  });

  it('rolls back only the failed event when toggles overlap', async () => {
    const failing = deferred<Event>();
    update.mockImplementation((event) =>
      event.id === '2' ? failing.promise : Promise.resolve(event),
    );
    const { result, cached } = setup();

    act(() => result.current.mutate({ id: '2', isFavorite: true }));
    act(() => result.current.mutate({ id: '5', isFavorite: true }));
    await waitFor(() => expect(cached('5')?.isFavorite).toBe(true));

    await act(async () => failing.reject(new Error('offline')));

    await waitFor(() => expect(cached('2')?.isFavorite).toBe(false));
    expect(cached('5')?.isFavorite).toBe(true);
  });

  it('sends toggles of the same event one after another and keeps the last value', async () => {
    const first = deferred<Event>();
    update.mockReturnValueOnce(first.promise).mockImplementation((event) => Promise.resolve(event));
    const { result, cached, invalidate } = setup();

    act(() => result.current.mutate({ id: '2', isFavorite: true }));
    act(() => result.current.mutate({ id: '2', isFavorite: false }));

    await waitFor(() => expect(update).toHaveBeenCalledTimes(1));
    expect(cached('2')?.isFavorite).toBe(false);

    await act(async () => first.resolve({ ...eventsFixture[1], isFavorite: true }));

    await waitFor(() => expect(update).toHaveBeenCalledTimes(2));
    expect(update).toHaveBeenLastCalledWith(expect.objectContaining({ isFavorite: false }));
    await waitFor(() => expect(invalidate).toHaveBeenCalledTimes(1));
    expect(cached('2')?.isFavorite).toBe(false);
  });

  it('leaves the cache unchanged for an unknown event', async () => {
    const { result, client } = setup();

    act(() => result.current.mutate({ id: '999', isFavorite: true }));

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(update).not.toHaveBeenCalled();
    expect(client.getQueryData(queryKeys.events.list())).toEqual(eventsFixture);
  });
});
