import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistStorage } from '@/helpers/storage';

export type Language = 'uk' | 'en';

type SettingsState = {
  language: Language | null; // null = мова пристрою
  setLanguage: (language: Language | null) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (language) => set({ language }),
    }),
    { name: 'settings', storage: createJSONStorage(() => persistStorage) },
  ),
);
