# Arena App — Agent Instructions

## Purpose

`apps/arena` is the Vite + React 19 SPA. It is the **workshop target** — most exercises happen here.

## Structure

- `src/main.tsx` — providers (`QueryClientProvider`, `BrowserRouter`)
- `src/router.tsx` — `<Routes>` declared in an `AppRoutes` component
- `src/layouts/Layout.tsx` — shared shell with sidebar, mobile header, top-level `<ErrorBoundary>` around `<Outlet>`
- `src/pages/` — route components
- `src/features/patients/` — patient list, card, header
- `src/features/journal/` — journal list, entry, form
- `src/components/` — app-specific shared bits (Spinner, ErrorBoundary)
- `src/lib/api.ts` — typed fetch helpers against `apps/api`

Reusable primitives belong in `packages/ui`, not here.

## Rules

1. Use `useQuery` / `useSuspenseQuery` for fetching. Never `useEffect` + `fetch`.
2. Use `useMutation` + `queryClient.invalidateQueries` after mutations.
3. Validate forms with a Zod schema wired through `zodResolver`.
4. Wrap `useSuspenseQuery` callsites in a local `<Suspense>` and a contextual `<ErrorBoundary>`. The Layout-level boundary is the catch-all; targeted ones keep the shell visible.
5. Import `StatusBadge`, `JournalStatus`, `Button`, `Card`, etc. from `@medix/ui`. Do not redefine them.
6. Compute derived state in render — do not store it in `useState` and sync via `useEffect`.

## Validation

```bash
npm run lint --workspace=apps/arena
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```
