import enCommon from './locales/en/common.json';
import ukCommon from './locales/uk/common.json';

// Новий розділ: додай json в обидві мови і зареєструй тут.
export const resources = {
  uk: { common: ukCommon },
  en: { common: enCommon },
} as const;

export const defaultNS = 'common';
export const supportedLanguages = ['uk', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
