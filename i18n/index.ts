import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { defaultNS, resources, supportedLanguages, type SupportedLanguage } from './resources';

export function deviceLanguage(): SupportedLanguage {
  const code = getLocales()[0]?.languageCode;
  return supportedLanguages.find((lang) => lang === code) ?? 'uk';
}

export const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage(),
  fallbackLng: 'uk',
  defaultNS,
  ns: Object.keys(resources.uk),
  interpolation: { escapeValue: false },
  returnNull: false,
});

export type { SupportedLanguage };
