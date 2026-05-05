# E2E — Agent Instructions

End-to-end tests for the Medix Arena SPA using Playwright. Tests run against the real `apps/arena` SPA and `apps/api` server (started via Playwright's `webServer`).

## Run

```bash
# First time only — installs the chromium browser
npm run e2e:install --workspace=apps/e2e

# Run the full suite
npm run e2e --workspace=apps/e2e

# Or use the shortcut from repo root
npm run e2e
```

`globalSetup` reseeds the SQLite DB before every run so tests get a known fixture set.

## Layout

- `playwright.config.ts` — webServer config (api on `:3001`, arena on `:5173`), single chromium project
- `global-setup.ts` — runs `apps/api` `db:seed`
- `tests/` — `*.spec.ts` files, one per user flow

## Rules

1. Tests must be deterministic. If a flow depends on seeded data, reference the IDs/names from `apps/api/src/db/seed.ts`.
2. Prefer role + accessible name selectors (`getByRole`, `getByLabel`). Avoid CSS class selectors.
3. Don't run e2e in `turbo test` — script is `e2e`, not `test`, on purpose.
