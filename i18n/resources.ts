import enCommon from './locales/en/common.json';
import enDiscover from './locales/en/discover.json';
import enFavorites from './locales/en/favorites.json';
import ukCommon from './locales/uk/common.json';
import ukDiscover from './locales/uk/discover.json';
import ukFavorites from './locales/uk/favorites.json';

// Новий розділ: додай json в обидві мови і зареєструй тут.
export const resources = {
  uk: { common: ukCommon, discover: ukDiscover, favorites: ukFavorites },
  en: { common: enCommon, discover: enDiscover, favorites: enFavorites },
} as const;

export const defaultNS = 'common';
export const supportedLanguages = ['uk', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
