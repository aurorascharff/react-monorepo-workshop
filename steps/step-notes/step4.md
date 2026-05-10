# Step 4: TanStack Query

## Introduce task in repo

- Problem: manual fetching repeats loading, error, race, and cache logic.
- Concepts: server state, query keys, loading states, errors, suspense queries, mutations, and invalidation.
- Rule of thumb: query keys describe identity; invalidation describes what changed.
- Outcome: replace manual fetch effects with queries and mutations.
- Show Module 4 in `exercises/module-4-tanstack-query.md`.
- Frame the exercise around server-state behavior: loading, error, cache, mutation, and refresh.

## Participant work (roughly 10 minutes)

- Ask participants to work in `apps/arena`.
- Listen for query key shape, where loading UI belongs, where the local error boundary belongs, what to invalidate after a mutation, and whether they over-invalidate.

## Group discussion (roughly 5 minutes)

- Focus on what code disappeared, what people chose for query keys, and what they invalidated after mutations.
- Land this point: query keys define identity. Mutations change server state. Invalidation tells the cache what needs to be refreshed.

## App: Show manual server state

- Open the current patient and journal fetching code.
- Open Network and filter by Fetch/XHR.
- Navigate from Dashboard to Patients.
- Point out that both screens fetch patient data independently.
- This is server state. The API owns it, and the client displays it.
- What are we manually handling right now?
- Answer to land: loading, errors, retries, stale data, cache, race conditions, and refetching after mutations.
- TanStack Query gives us a standard way to describe server state instead of rebuilding that infrastructure in each component.

## App: Check QueryClientProvider

- Open `apps/arena/src/main.tsx`.
- Show `QueryClientProvider`.
- The `QueryClient`.
- Check `staleTime` and `retry`.
- `staleTime`: how long data is considered fresh.
- `retry`: how failed requests are retried.

## App: Create usePatients

- Create `features/patients/hooks/usePatients.ts`.
- Add `useQuery`.
- Use `queryKey: ['patients']`.
- Use `queryFn: fetchPatients`.
- A query key is the cache address.
- What should go in a query key?
- Answer to land: the stable identity of the data. Include variables when they change what data comes back.
- What should happen if Dashboard and Patients both ask for `['patients']`?
- Answer to land: they should reuse the same cache entry.
- Variables belong in the query key when they change the returned data.

## App: Use usePatients

- Open `pages/PatientListPage.tsx`.
- Replace local `patients`, `isLoading`, and fetching effect with `usePatients`.
- Render loading, error, and success states.
- Open `pages/DashboardPage.tsx`.
- Replace manual fetching with `usePatients`.
- Navigate between Dashboard and Patients to verify cache reuse.
- Open React Query Devtools and show that both screens use the same `['patients']` cache entry.
- What code disappeared when fetching moved to TanStack Query?
- Answer to land: local loading state, fetching effects, repeated fetch calls, and manual success/error bookkeeping.
- We removed duplicated fetching logic, but we also got better navigation behavior because data is cached.

## App: Fetch patient detail with useSuspenseQuery

- Open `pages/PatientDetailPage.tsx`.
- Create an inner `PatientDetail` component.
- Use `useSuspenseQuery`.
- Use `queryKey: ['patient', id]`.
- Use `queryFn` to fetch one patient by id.
- Open React Query Devtools and show that each patient id gets a separate cache entry.
- `useSuspenseQuery` does not give us `isLoading`. It suspends and lets the parent boundary decide loading UI.
- Why does `id` belong in the query key?
- Answer to land: different patients are different cached data.

## App: Add local Suspense and ErrorBoundary

- Wrap `PatientDetail` in local `Suspense` with `Spinner`.
- Wrap the Suspense boundary in local `ErrorBoundary`.
- Keep the layout-level boundary as the catch-all.
- If patient detail fails, the shell and navigation stay visible.
- What would be worse about only having one top-level boundary?
- Answer to land: it makes a local data failure feel like the whole app failed.

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
- Change a status with Network and React Query Devtools open.
- Show the update request, then show `['journals', patientId]` refetching.
- Mutation: an operation that changes server state.
- Invalidation: mark cached data as stale so it refetches.
- What should happen after a mutation succeeds?
- Answer to land: invalidate or update the affected cached data so the UI reflects the server state.
- Why invalidate only this patient's journals instead of everything?
- Answer to land: smaller invalidation means less unnecessary work and fewer surprising updates.

## App: Submit journal form through mutation

- Keep the form validation unchanged in this module.
- Use `useMutation` for `createJournal`.
- On success, invalidate `['journals', patientId]`.
- Reset the form after a successful submit.
- Submit once with Network open and show the POST request.
- Show that the journal list refreshes because the journals query is invalidated.

## Check and module close

- Run `npm run typecheck --workspace=apps/arena`.
- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
