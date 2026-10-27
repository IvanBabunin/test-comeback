import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistStorage } from '@/helpers/storage';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'uk' | 'en';

type SettingsState = {
  themeMode: ThemeMode;
  language: Language | null; // null = мова пристрою
  setThemeMode: (mode: ThemeMode) => void;
  setLanguage: (language: Language | null) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      language: null,
      setThemeMode: (themeMode) => set({ themeMode }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'settings', storage: createJSONStorage(() => persistStorage) },
  ),
);
