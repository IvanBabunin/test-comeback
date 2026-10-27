import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

/** Несекретні дані: налаштування, кеш, чернетки. */
export const storage = createMMKV({ id: 'app' });

/** Адаптер для zustand/persist. */
export const persistStorage: StateStorage = {
  getItem: (key) => storage.getString(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => {
    storage.remove(key);
  },
};
