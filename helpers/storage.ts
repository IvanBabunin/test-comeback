import * as SecureStore from 'expo-secure-store';
import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

/** Токени і все секретне — тільки тут (Keychain / Keystore). */
const TOKEN_KEY = 'auth.token';

export const tokenStorage = {
  get: () => SecureStore.getItemAsync(TOKEN_KEY),
  set: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
  clear: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};

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
