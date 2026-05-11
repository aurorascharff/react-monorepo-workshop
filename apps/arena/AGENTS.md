# Arena App — Agent Instructions

## Purpose

`apps/arena` is the Vite + React 19 SPA. It is the clinician-facing journal app — the primary product surface.

## Structure

- `src/main.tsx` — providers (`QueryClientProvider`, `BrowserRouter`)
- `src/router.tsx` — `<Routes>` declared in an `AppRoutes` component
- `src/layouts/Layout.tsx` — shared shell with sidebar, mobile header, top-level `<ErrorBoundary>` around `<Outlet>`
- `src/pages/` — route components
- `src/features/patients/` — patient list, card, header
- `src/features/journal/` — journal list, entry, form
- `src/components/` — app-specific shared bits (ErrorBoundary, loading and error states)
- `src/lib/api.ts` — typed fetch helpers against `apps/api`

Reusable primitives belong in `packages/ui`, not here.

## Rules

1. Use `useQuery` for fetching unless a Suspense boundary is intentionally part of the design. Never `useEffect` + `fetch`.
2. Use `useMutation` + `queryClient.invalidateQueries` after mutations.
3. Validate forms with a Zod schema wired through `zodResolver`.
4. Render explicit loading, error, empty, busy, and success states for regular `useQuery` callsites. Build loading UI with shared `@medix/ui` primitives such as `Skeleton`; avoid generic spinners for page and data loading states. If using `useSuspenseQuery`, wrap the callsite in a local `<Suspense>` and contextual `<ErrorBoundary>`.
5. Import `JournalStatus`, `Button`, `Card`, etc. from `@medix/ui`. Do not redefine shared primitives or shared types.
6. Compute derived state in render — do not store it in `useState` and sync via `useEffect`.
7. Put unit and component tests in a nearby `tests/` subfolder, for example `components/tests/PatientCard.test.tsx` or `hooks/tests/usePatients.test.tsx`.

## Validation

```bash
npm run lint --workspace=apps/arena
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```
