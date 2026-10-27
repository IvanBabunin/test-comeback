import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enProfile from './locales/en/profile.json';
import ukAuth from './locales/uk/auth.json';
import ukCommon from './locales/uk/common.json';
import ukProfile from './locales/uk/profile.json';

// Новий розділ: додай json в обидві мови і зареєструй тут.
export const resources = {
  uk: { common: ukCommon, auth: ukAuth, profile: ukProfile },
  en: { common: enCommon, auth: enAuth, profile: enProfile },
} as const;

export const defaultNS = 'common';
export const supportedLanguages = ['uk', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
