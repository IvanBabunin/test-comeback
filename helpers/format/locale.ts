const LOCALES: Record<string, string> = { en: 'en-GB', uk: 'uk-UA' };

/** Мова інтерфейсу → локаль для Intl (дати, ціни). */
export const toLocale = (language: string) => LOCALES[language] ?? 'en-GB';
