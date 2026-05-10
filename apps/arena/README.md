# Arena

Arena is the clinician-facing journal app. It is a React Router SPA for authenticated, workflow-heavy product screens with routing, client state, server state, forms, and API interaction.

## Run

```bash
npm run dev --workspace=apps/arena
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena
```

Arena expects the API to run on `http://localhost:3001`. From the repo root, `npm run dev` starts both.

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
