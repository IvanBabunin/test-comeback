# Project rules

@AGENTS.md

`AGENTS.md` above is Expo's general guidance. Where the two disagree, **this file wins**.

Use the `expo` plugin skills (enabled in `.claude/settings.json`) for Expo, EAS and native UI work before writing code from memory.

**Navigation: A — tabs: кожен таб — папка з _layout (Stack) + index; група `(tabs)`**

## Stack

Expo SDK 57 · Expo Router · TypeScript strict · TanStack Query (server state) · Zustand (client state) · react-hook-form + zod · i18next (`uk` default, `en`) · MMKV + expo-secure-store · Reanimated + Worklets · `@react-native-vector-icons/*` · EAS Build / Update. Development builds only (no Expo Go).

Install native packages with `npx expo install <pkg>`, never plain `npm i`.

## Structure

One rule everywhere: **folder by type first, then by domain/section inside it.**

```
app/                 routes only (Expo Router)
components/
  shared/ui/         base building blocks, props only, no business logic
  shared/layout/     Screen, EmptyState, ErrorState, TabBarIcon
  shared/forms/      inputs wired to react-hook-form
  screens/<section>/ components used by ONE section, mirrors app/
hooks/
  api/<domain>/      TanStack Query hooks (useX, useCreateX)
  ui/                UI behaviour hooks
  utils/             generic hooks (useDebounce, useAppState)
api/<domain>.ts      request functions only, one file per domain
store/<domain>.ts    Zustand, one file per domain
types/models/        names for generated DTOs (never hand-written fields)
types/forms/         zod schemas for forms + z.infer types
providers/           AppProviders, ThemeProvider
theme/               tokens, makeStyles, useTheme
i18n/locales/<lang>/<section>.json
helpers/api/         client, errors, endpoints, query-keys, schema.d.ts (generated)
helpers/format/      pure formatters
helpers/             routes, storage, logger, query-client
config/env.ts        EXPO_PUBLIC_* validated with zod
```

**Sections vs domains.** Sections are the first-level folders of the navigation group in `app/` (a tab, or a first stack level). They name `components/screens/<section>` and `i18n/locales/*/<section>.json`. Domains are backend entities, plural (`orders`, `users`, `auth`). They name `api/`, `hooks/api/`, `store/`, `types/`, and query keys.

A component in `screens/<section>` is used by that section only. The moment a second section needs it, move it to `shared/`.

## Layers (enforced by ESLint — do not disable the rule)

| Folder               | May import from                                                                         |
| -------------------- | --------------------------------------------------------------------------------------- |
| `app`                | everything                                                                              |
| `providers`          | everything except `app`                                                                 |
| `components/screens` | `components/shared`, `hooks`, `store`, `theme`, `i18n`, `helpers`, `types`              |
| `components/shared`  | `components/shared`, `theme`, `i18n`, `helpers`, `types` (no data fetching, props only) |
| `hooks`              | `api`, `store`, `helpers`, `types`, `config`, `theme`, `i18n`                           |
| `api`                | `helpers`, `types`, `config`                                                            |
| `store`              | `helpers`, `types`                                                                      |
| `theme`, `i18n`      | own files only                                                                          |
| `helpers`            | `helpers`, `config`, `types`                                                            |
| `types`              | `helpers/api/schema`                                                                    |

- Cross-folder imports use the `@/` alias. `../` is forbidden.
- Nothing imports from `app/`.

## Routes (`app/`)

- `app/` contains routes only. Every file there becomes a screen, so never put components or utils in it.
- A route file IS the screen: data from `hooks/api`, markup from `components/`. Keep it under ~150 lines.
- Navigate with `ROUTES` (`helpers/routes.ts`): `router.push(ROUTES.SETTINGS)`, `router.push(ROUTES.DETAILS(id))`. Never inline paths.
- `_layout.tsx` only where navigation behaviour changes (navigator type, header). Not one per folder.
- Auth guarding lives only in `app/_layout.tsx` via `Stack.Protected`. Screens never check auth.
- Screens that open over the current one and close with ✕ go to `app/(modals)/`.
- Nesting depth ≤ 2 by ownership. An entity with a unique id gets a short route (`lockers/[lockerId]`), not a chain of parent params.
- In-screen tabs: a `_layout.tsx` at that level using `expo-router/js-top-tabs`.
- Never import `@react-navigation/*` directly (SDK 56+). Use `expo-router` entry points (`expo-router/react-navigation`, `expo-router/js-top-tabs`, …).
- Navigation patterns: **A tabs** — `(tabs)/<tab>/_layout.tsx + index.tsx`, first tab as a group `(home)` so it lives at `/`. **B stack** — `(main)/` with one Stack for all levels. **C mixed** — tabs whose tab Stacks contain levels.

## Data

- Server data lives in TanStack Query only. Never copy it into Zustand.
- Zustand holds client state only: session status, settings, drafts.
- Chain is always `api/<domain>.ts` → `hooks/api/<domain>/useX.ts` → component. Components never call `http` or `fetch`.
- Query keys come from `helpers/api/query-keys.ts`, never inline arrays.
- Endpoint paths come from `ENDPOINTS` (`helpers/api/endpoints.ts`), never inline strings.
- Response types come from `helpers/api/schema.d.ts` (`npm run api:types` from the NestJS Swagger). `types/models/*` only aliases them: `export type Order = components['schemas']['OrderDto']`.
- Errors are `ApiError` (`helpers/api/errors.ts`). 401 signs the user out globally.

## Security

- Tokens and secrets: `tokenStorage` (expo-secure-store) only. Never MMKV, Zustand persist, or logs.
- Only `EXPO_PUBLIC_*` variables reach the app, and they are public. No secrets there.

## UI

- Colors, spacing, radius, typography come from `theme` tokens only. No hex values or magic numbers in components.
- Styles: `const useStyles = makeStyles((t) => ({ … }))` at the bottom of the file. Inline styles only for dynamic values.
- Every screen is wrapped in `<Screen>`.
- Every loading, empty and error state is handled (`EmptyState`, `ErrorState`, `loading` on `Button`).
- Every user-facing string goes through `t()`. Namespaces are sections: `useTranslation('orders')`, shared strings in `common`. Need keys from several namespaces → `useTranslation(['orders', 'common'])` and prefix the non-first ones: `t('common:actions.save')`. Add keys to **both** `uk` and `en`, and register new namespaces in `i18n/resources.ts`.
- zod error messages are translation keys (`'auth:errors.emailInvalid'`); `FormInput` translates them.
- Icons: `@react-native-vector-icons/material-design-icons`.

## Native UI first

If Expo ships a native component for it, use that. Never fake native look (glass, blur, tab bars, pickers) with Views, gradients, opacity or Reanimated.

| Need                                                           | Use                                                                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Liquid Glass (iOS 26)                                          | `expo-glass-effect`: `GlassView`, `GlassContainer`; gate with `isLiquidGlassAvailable()` |
| Tab bar (native, Liquid Glass on iOS 26)                       | `NativeTabs` from `expo-router/unstable-native-tabs`                                     |
| Segmented control                                              | `SegmentedControl` from `@expo/ui/community/segmented-control`                           |
| Blur                                                           | `expo-blur`                                                                              |
| Switch, slider, picker, menu, bottom sheet, date picker, pager | `@expo/ui` (`community/*`, `swift-ui`, `jetpack-compose`)                                |
| Animation                                                      | `react-native-reanimated`                                                                |

- Not in the table? Check the `expo` plugin skills and the SDK docs for a native module before building one.
- A new native package needs `npx expo install` and a new development build.

## Naming

- Components and screens components: `PascalCase.tsx`, one component per file, `type XProps` in the same file.
- Hooks: `useSomething.ts`. Everything else: `kebab-case.ts`. Route files follow Expo Router.
- Named exports everywhere; `export default` only in route files.
- Barrel `index.ts` only in `components/shared/*` and `theme/`.
- Tests sit next to the file: `format-price.test.ts`.

## Adding a feature (e.g. `orders`)

1. `npm run api:types` → alias in `types/models/order.ts`.
2. Paths in `helpers/api/endpoints.ts` → `api/orders.ts` → keys in `helpers/api/query-keys.ts` → `hooks/api/orders/useOrders.ts`.
3. Route files in `app/` + paths in `helpers/routes.ts` → components in `components/screens/orders/`.
4. `i18n/locales/{uk,en}/orders.json` → register in `i18n/resources.ts`.
5. Form? zod schema in `types/forms/`.

## Done means

`npm run lint`, `npm run typecheck` and `npm test` all pass. No new warnings.

## Never

- Components, hooks or utils inside `app/`.
- `fetch`/`http` in components, or server data in Zustand.
- Tokens outside secure-store.
- Hardcoded colors, spacing or UI strings.
- `@react-navigation/*` or `@expo/vector-icons` imports.
- `../` imports across folders, or disabling the layer lint rule.
- Editing `helpers/api/schema.d.ts` by hand.
- Creating or editing `ios/` / `android/` by hand.
