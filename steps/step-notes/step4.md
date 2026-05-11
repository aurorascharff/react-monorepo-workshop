# Step 4: Server State

## Frame what we are solving

- Say: the problem is not fetch itself. The problem is everything around fetch: waiting, errors, stale data, race conditions, retries, and refresh after mutations.
- Ask: which parts of this data belong to the server, and what should the UI show while we wait?
- Land this: server state needs a cache, identity, loading behavior, error behavior, busy behavior, and refresh behavior.
- Show Module 4 in [`exercises/module-4-server-state.md`](../../exercises/module-4-server-state.md).

## Participant work (roughly 10 minutes)

- Ask participants to work in `apps/arena`.
- Listen for query key shape, where loading UI belongs, whether loading/error/busy states match the screen, where the local error boundary belongs, what to invalidate after a mutation, and whether they over-invalidate.

## Group discussion (roughly 5 minutes)

- Focus on what code disappeared, what people chose for query keys, and what they invalidated after mutations.
- Land this point: query keys define identity. Mutations change server state. Invalidation tells the cache what needs to be refreshed.
- Ask before live coding: what did you see in Network or [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) that changed how you thought about the task?

## App: Show manual server state

- Open the current patient and journal fetching code.
- Open Network and filter by Fetch/XHR.
- Navigate from Dashboard to Patients.
- Point out that both screens fetch patient data independently.
- This is server state. The API owns it, and the client displays it.
- Relate back to the background: the hard part is time. Requests can be slow, fail, finish out of order, or return data that is already stale.
- What are we manually handling right now?
- Answer to land: loading, errors, retries, stale data, cache, race conditions, and refetching after mutations.
- Mention the intermediate option: we could extract this into a custom hook that uses [`useEffect`](https://react.dev/reference/react/useEffect). That would make components cleaner, but it would still leave us responsible for cache, dedupe, stale data, invalidation, and race conditions.
- Point to the React docs section on [fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects). The docs show the manual pattern and also explain why a client-side cache is usually a better fit for app data.
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) gives us a standard way to describe server state instead of rebuilding that infrastructure in each component.

## App: Add QueryClientProvider

- Open `apps/arena/src/main.tsx`.
- Add [`QueryClientProvider`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider).
- Create the `QueryClient`.
- Set `staleTime` and `retry`.
- `staleTime`: how long data is considered fresh.
- `retry`: how failed requests are retried.

## App: Create usePatients

- Create `features/patients/hooks/usePatients.ts`.
- Add [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).
- Use `queryKey: ['patients']`.
- Use `queryFn: fetchPatients`.
- A [query key](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) is the cache address.
- What should go in a query key?
- Answer to land: the stable identity of the data. Include variables when they change what data comes back.
- What should happen if Dashboard and Patients both ask for `['patients']`?
- Answer to land: they should reuse the same cache entry.
- Variables belong in the query key when they change the returned data.

## App: Use usePatients

- Open `pages/PatientListPage.tsx`.
- Replace local `patients`, `isLoading`, and fetching effect with `usePatients`.
- Render loading, error, and success states.
- Write the error message for this route. Log the real API error with `logError`, but do not show `error.message` to the user.
- Use the shared [`Skeleton`](https://ui.shadcn.com/docs/components/skeleton) primitive from `@medix/ui` for loading states, but export each skeleton from the component or page file it represents. A dashboard skeleton belongs with `DashboardPage`. A patient list skeleton belongs with `PatientList`.
- Keep error presentation in Arena. The app knows what failed and what recovery context the user needs.
- Open `pages/DashboardPage.tsx`.
- Replace manual fetching with `usePatients`.
- Navigate between Dashboard and Patients to verify cache reuse.
- Open [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) and show that both screens use the same `['patients']` cache entry.
- What code disappeared when fetching moved to TanStack Query?
- Answer to land: local loading state, fetching effects, repeated fetch calls, and manual success/error bookkeeping.
- We removed duplicated fetching logic, but we also got better navigation behavior because data is cached.

## App: Fetch patient detail with useQuery

- Open `pages/PatientDetailPage.tsx`.
- Use [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).
- Use `queryKey: ['patient', id]`.
- Use `queryFn` to fetch one patient by id.
- Open [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) and show that each patient id gets a separate cache entry.
- Render loading, error, and success states in the page.
- Write the error message for the patient detail route. The logged error can be technical; the visible message should help the user recover.
- This is a little more repetitive, but it is straightforward: we can see exactly what the UI does for each server-state state.
- Do not treat loading as decoration. It is part of the screen design and should preserve the user's context.
- Why does `id` belong in the query key?
- Answer to land: different patients are different cached data.

## Optional: Suspense Query

- Mention [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery) as an alternative.
- With Suspense Query, the component does not receive `isLoading`. It suspends and lets a parent [`Suspense`](https://react.dev/reference/react/Suspense) boundary decide the loading UI.
- That can make components cleaner, but it introduces another boundary concept and can feel less direct while learning server state.
- Relate back to the background: Suspense is another way to handle time. The component can say “I need this data,” and the boundary decides what the user sees while waiting.

## App: Create useJournals

- Create `features/journal/hooks/useJournals.ts`.
- Add [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery).
- Use `queryKey: ['journals', patientId]`.
- Use `queryFn` to fetch journals for the patient.
- Use the hook in `JournalList`.
- Render loading, error, empty, and success states.
- Write the error message for the journal list. Hide API/internal details from the user and log them instead.
- Empty, loading, and error are three different UI states. They should not look like the same blank gap with different text.
- Empty state is not an error. It is a valid server response that needs its own UI.

## App: Update journal status with useMutation

- Open `JournalEntry.tsx`.
- Add [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) for `updateJournalStatus`.
- Add [`useQueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient).
- On success, invalidate `['journals', patientId]`.
- Change a status with Network and [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) open.
- Point out the busy state on the status control while the mutation is pending.
- If the mutation fails, log the real error and show a short recovery message near the control.
- Show the update request, then show `['journals', patientId]` refetching.
- Mutation: an operation that changes server state.
- [Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation): mark cached data as stale so it refetches.
- What should happen after a mutation succeeds?
- Answer to land: invalidate or update the affected cached data so the UI reflects the server state.
- Why invalidate only this patient's journals instead of everything?
- Answer to land: smaller invalidation means less unnecessary work and fewer surprising updates.

## App: Submit journal form through mutation

- Keep the form validation unchanged in this module.
- Use [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) for `createJournal`.
- On success, invalidate `['journals', patientId]`.
- Reset the form after a successful submit.
- Submit once with Network open and show the POST request.
- Point out the pending submit state near the button, not as a page-level spinner.
- If submit fails, log the real error and show a form-level recovery message that does not expose the API response.
- Show that the journal list refreshes because the journals query is invalidated.

## Bonus if people finish early

- Make journal creation optimistic with TanStack Query's [`onMutate`](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates): add the temporary entry immediately, clear the form, replace the temporary entry with the server response, and restore the submitted values if the request fails.
- Frame this as a final-app improvement, not the required workshop solution.

## Check and module close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
