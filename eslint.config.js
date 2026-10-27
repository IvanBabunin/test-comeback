// Правила шарів: хто кого може імпортувати.
// Якщо ESLint свариться на імпорт — це порушення структури, а не баг лінтера.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const COMMON = [
  {
    group: ['@react-navigation/*'],
    message:
      'Від SDK 56 імпортуй навігацію з entry points expo-router (напр. expo-router/react-navigation).',
  },
  {
    group: ['@expo/vector-icons', '@expo/vector-icons/*'],
    message: 'Використовуй @react-native-vector-icons/*.',
  },
  {
    group: ['../*', '../../*', '../../../*'],
    message: 'Між папками імпортуй через alias @/…',
  },
];

const deny = (...layers) => [
  'error',
  {
    patterns: [
      ...COMMON,
      ...layers.map((layer) => ({
        group: [`@/${layer}`, `@/${layer}/*`],
        message: `Цей шар не може імпортувати з ${layer}/ (див. CLAUDE.md → Layers).`,
      })),
    ],
  },
];

const UI_AND_ABOVE = ['app', 'components', 'hooks', 'providers'];

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'navigation/*', 'scripts/*', 'helpers/api/schema.d.ts', '.expo/*'],
  },
  { rules: { 'no-restricted-imports': deny() } },
  { files: ['providers/**'], rules: { 'no-restricted-imports': deny('app') } },
  {
    files: ['components/shared/**'],
    rules: {
      'no-restricted-imports': deny(
        'app',
        'components/screens',
        'hooks/api',
        'api',
        'store',
        'providers',
      ),
    },
  },
  {
    files: ['components/screens/**'],
    rules: { 'no-restricted-imports': deny('app', 'api', 'providers') },
  },
  {
    files: ['hooks/**'],
    rules: { 'no-restricted-imports': deny('app', 'components', 'providers') },
  },
  { files: ['api/**'], rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'store') } },
  { files: ['store/**'], rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'api') } },
  {
    files: ['types/**'],
    rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'api', 'store', 'theme', 'i18n') },
  },
  {
    files: ['theme/**'],
    rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'api', 'store', 'i18n', 'helpers') },
  },
  {
    files: ['i18n/**'],
    rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'api', 'store', 'theme', 'helpers') },
  },
  {
    files: ['helpers/**'],
    rules: { 'no-restricted-imports': deny(...UI_AND_ABOVE, 'api', 'store', 'theme', 'i18n') },
  },
  {
    files: ['config/**'],
    rules: {
      'no-restricted-imports': deny(...UI_AND_ABOVE, 'api', 'store', 'theme', 'i18n', 'helpers'),
    },
  },
]);
