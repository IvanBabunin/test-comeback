import 'i18next';

import type { defaultNS, resources } from './resources';

// Типізовані ключі: t('auth:login.title') перевіряється компілятором.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['uk'];
  }
}
