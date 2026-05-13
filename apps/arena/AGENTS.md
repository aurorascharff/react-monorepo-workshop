# Arena App — Agent Instructions

## Purpose

`apps/arena` is the Vite + React 19 SPA. It is the clinician-facing journal app — the primary product surface.

## Structure

- `src/main.tsx` — providers (`QueryClientProvider`, `BrowserRouter`)
- `src/router.tsx` — `<Routes>` declared in an `AppRoutes` component
- `src/layouts/RootLayout.tsx` — root layout component used by the `<Route path="/">` parent: sidebar, mobile header, top-level `<ErrorBoundary>` around `<Outlet>`
- `src/pages/` — route components
- `src/features/patients/` — patient list, card, header
- `src/features/journal/` — journal list, entry, form
- `src/components/` — app-specific shared bits (ErrorBoundary, loading and error states)
- `src/lib/api.ts` — typed fetch helpers against `apps/api`

Reusable primitives belong in `packages/ui`, not here.

## Rules

1. Server state goes through TanStack Query (`useQuery` / `useMutation` + `queryClient.invalidateQueries`). Forms go through React Hook Form + Zod (`zodResolver`).
2. Build loading UI with the shared `Skeleton` primitive from `@medix/ui`, shaped like the content. Reserve `Spinner` for inline busy states inside controls.
3. Import shared primitives such as `Button` and `Card` from `@medix/ui`. Keep app-specific workflow types, such as `JournalStatus`, in Arena until another app genuinely shares the same concept.
4. Put unit and component tests in a nearby `tests/` subfolder, for example `components/tests/PatientCard.test.tsx` or `hooks/tests/usePatients.test.tsx`.

For React patterns (derived state, effects, memoization, etc.), use the `/react-best-practices` skill.

## Validation

```bash
npm run lint --workspace=apps/arena
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```
