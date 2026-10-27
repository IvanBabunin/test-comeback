# **APP_NAME**

Expo SDK 57 · Expo Router · TypeScript · TanStack Query · Zustand.

## Новий проєкт з шаблону

1. GitHub → **Use this template** → клонуй.
2. `npm install`
3. `npm run setup` — питає назву, bundle id і навігацію:
   - **tabs** — таб-бар; кожен таб — папка з `_layout.tsx` та `index.tsx`;
   - **stack** — рівні без табів (список → деталі → …);
   - **mixed** — таби, а всередині табів рівні.

   Без питань: `npm run setup -- --name "My App" --bundle-id com.me.myapp --nav stack`

4. `cp .env.example .env` і вкажи `EXPO_PUBLIC_API_URL`.
5. `npx eas-cli@latest init` → встав `projectId` в `app.config.ts` (`EAS_PROJECT_ID`).
6. `npx eas-cli@latest build --profile development --platform ios` (або `android`), встанови збірку на телефон.
7. `npm start`

Скрипт setup після роботи видаляє себе і папку `navigation/`.

## Команди

| Команда             | Що робить                                                                               |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm start`         | dev-сервер для development build                                                        |
| `npm run lint`      | ESLint, включно з правилами шарів                                                       |
| `npm run typecheck` | TypeScript                                                                              |
| `npm test`          | Jest                                                                                    |
| `npm run api:types` | типи з Swagger NestJS → `helpers/api/schema.d.ts` (потрібен `SWAGGER_URL` у середовищі) |
| `npm run doctor`    | перевірка залежностей Expo                                                              |

## Середовища

`APP_VARIANT` = `development` / `preview` / `production` (задається профілями в `eas.json`). Dev і preview мають суфікс у bundle id і назві, тому стоять на телефоні поряд із продом.

## CI/CD

- `ci.yml` — lint, typecheck, test на кожен PR і push у `main`.
- `eas-update.yml` — push у `main` → OTA в канал `preview`; production — вручну.
- `eas-build.yml` — тег `v*` → production-збірка iOS та Android.

Потрібно в GitHub: секрет `EXPO_TOKEN`, змінна `EXPO_PUBLIC_API_URL`. Для EAS Build ту саму змінну задай в EAS (Environment variables).

## Для Claude Code

Правила проєкту — у `CLAUDE.md` (він підключає `AGENTS.md`). Плагін `expo@claude-plugins-official` увімкнено в `.claude/settings.json` — Claude Code запропонує його встановити при першому відкритті проєкту. Вручну:

```
claude plugin install expo@claude-plugins-official --scope project
```
