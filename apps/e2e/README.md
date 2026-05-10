# E2E

This workspace contains Playwright tests for Arena. The tests run against the real Arena SPA and API.

## Run

```bash
npm run e2e
npm run e2e --workspace=apps/e2e
npm run e2e:ui --workspace=apps/e2e
```

The test setup reseeds the SQLite database before each run.

## Structure

```text
playwright.config.ts  - web server and browser setup
global-setup.ts       - database reset before tests
tests/                - browser-level user flows
```

## Notes

Browser tests cover routing, patient workflows, and form behavior.
