# Arena

Arena is the clinician-facing journal app. It is a React Router SPA for authenticated, workflow-heavy product screens with routing, client state, server state, forms, and API interaction.

## Run

```bash
pnpm --filter ./apps/arena dev
pnpm --filter ./apps/arena typecheck
pnpm --filter ./apps/arena test
```

Arena expects the API to run on `http://localhost:3001`. From the repo root, `pnpm dev` starts both.

## Structure

```text
src/
  main.tsx      - providers
  router.tsx    - route tree
  layouts/      - app shell
  pages/        - route-level pages
  features/     - patient and journal UI
  components/   - app-only shared components
  hooks/        - app-level reusable hooks
  lib/api.ts    - typed API helpers
```

## Notes

Use this app to inspect URL behavior, Network requests, React Query Devtools, form labels, loading states, and error recovery.
