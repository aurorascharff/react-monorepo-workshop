# E2E

This workspace contains Playwright tests for Arena. The tests run against the real Arena SPA and API.

## Run

```bash
pnpm e2e
pnpm --filter ./apps/e2e e2e
pnpm --filter ./apps/e2e e2e:ui
```

The test setup reseeds the SQLite database before each run. The suite runs with
one worker because some tests update the seeded data.

## Structure

```text
playwright.config.ts  - web server and browser setup
global-setup.ts       - database reset before tests
tests/                - browser-level user flows
```

## Notes

Browser tests cover routing, patient workflows, and form behavior.
