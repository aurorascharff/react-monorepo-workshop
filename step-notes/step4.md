# Step 4: TanStack Query


## App: Show manual server state

- Open the current patient and journal fetching code.
- This is server state. The API owns it, and the client displays it.
- What are we manually handling right now?
- The answers I want to draw out: Loading, errors, retries, stale data, cache, race conditions, refetching after mutations.
- TanStack Query gives us a standard way to describe server state instead of rebuilding that infrastructure in each component.

## App: Check QueryClientProvider

- Open `apps/arena/src/main.tsx`.
- Show `QueryClientProvider`.
- The `QueryClient`.
- Check `staleTime` and `retry`.
- `staleTime`: how long data is considered fresh.
- `retry`: how failed requests are retried.
- React Query Devtools if you want to show cache state during the demo.

## App: Create usePatients

- Create `features/patients/hooks/usePatients.ts`.
- Add `useQuery`.
- Use `queryKey: ['patients']`.
- Use `queryFn: fetchPatients`.
- A query key is the cache address.
- What should happen if Dashboard and Patients both ask for `['patients']`?
- The answers I want to draw out: They should reuse the same cache entry.
- Variables belong in the query key when they change the returned data.

## App: Use usePatients

- Open `pages/PatientListPage.tsx`.
- Replace local `patients`, `isLoading`, and fetching effect with `usePatients`.
- Render loading, error, and success states.
- Open `pages/DashboardPage.tsx`.
- Replace manual fetching with `usePatients`.
- Navigate between Dashboard and Patients to verify cache reuse.
- We removed duplicated fetching logic, but we also got better navigation behavior because data is cached.

## App: Fetch patient detail with useSuspenseQuery

- Open `pages/PatientDetailPage.tsx`.
- Create an inner `PatientDetail` component.
- Use `useSuspenseQuery`.
- Use `queryKey: ['patient', id]`.
- Use `queryFn` to fetch one patient by id.
- `useSuspenseQuery` does not give us `isLoading`. It suspends and lets the parent boundary decide loading UI.
- Why does `id` belong in the query key?
- The answers I want to draw out: Different patients are different cached data.

## App: Add local Suspense and ErrorBoundary

- Wrap `PatientDetail` in local `Suspense` with `Spinner`.
- Wrap the Suspense boundary in local `ErrorBoundary`.
- Keep the layout-level boundary as the catch-all.
- This boundary is contextual. If patient detail fails, the shell and navigation are still useful.
- What would be worse about only having one top-level boundary?
- The answers I want to draw out: It makes a local data failure feel like the whole app failed.

## App: Create useJournals

- Create `features/journal/hooks/useJournals.ts`.
- Add `useQuery`.
- Use `queryKey: ['journals', patientId]`.
- Use `queryFn` to fetch journals for the patient.
- Use the hook in `JournalList`.
- Render loading, error, empty, and success states.
- Empty state is not an error. It is a valid server response that needs its own UI.

## App: Update journal status with useMutation

- Open `JournalEntry.tsx`.
- Add `useMutation` for `updateJournalStatus`.
- Add `useQueryClient`.
- On success, invalidate `['journals', patientId]`.
- Mutation: an operation that changes server state.
- Invalidation: mark cached data as stale so it refetches.
- Why invalidate only this patient's journals instead of everything?
- The answers I want to draw out: Smaller invalidation means less unnecessary work and fewer surprising updates.

## App: Submit journal form through mutation

- Keep the form manual for now.
- Use `useMutation` for `createJournal`.
- On success, invalidate `['journals', patientId]`.
- Reset the form after a successful submit.
- Validation is still not solved. That is the next module.

## Check

- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.

