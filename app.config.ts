import type { ConfigContext, ExpoConfig } from 'expo/config';

const APP_NAME = 'Test Comeback';
const APP_SLUG = 'test-comeback';
const BUNDLE_ID = 'com.example.testcomeback';
// Після `npx eas-cli@latest init` встав сюди projectId
const EAS_PROJECT_ID: string = '';

type Variant = 'development' | 'preview' | 'production';

const variant = (process.env.APP_VARIANT ?? 'development') as Variant;

const VARIANTS: Record<Variant, { idSuffix: string; nameSuffix: string }> = {
  development: { idSuffix: '.dev', nameSuffix: ' (Dev)' },
  preview: { idSuffix: '.preview', nameSuffix: ' (Preview)' },
  production: { idSuffix: '', nameSuffix: '' },
};

const { idSuffix, nameSuffix } = VARIANTS[variant];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: `${APP_NAME}${nameSuffix}`,
  slug: APP_SLUG,
  scheme: APP_SLUG,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: `${BUNDLE_ID}${idSuffix}`,
    supportsTablet: false,
  },
  android: {
    package: `${BUNDLE_ID}${idSuffix}`,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        backgroundColor: '#FFFFFF',
        dark: { backgroundColor: '#101214' },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  runtimeVersion: { policy: 'appVersion' },
  ...(EAS_PROJECT_ID ? { updates: { url: `https://u.expo.dev/${EAS_PROJECT_ID}` } } : {}),
  extra: {
    appVariant: variant,
    ...(EAS_PROJECT_ID ? { eas: { projectId: EAS_PROJECT_ID } } : {}),
  },
});
