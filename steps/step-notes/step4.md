# Step 4: Server State

## Before They Work

- Say: the problem is not fetch. The problem is waiting, errors, stale data, race conditions, retries, and refresh after mutations.
- Question: which data belongs to the server, and what should the UI show while we wait?
- Answer: server state needs cache identity, loading, error, busy, and refresh behavior.
- Show Exercise Four in [`exercises/exercise-4-server-state.md`](../../exercises/exercise-4-server-state.md).

## Participant Work

- Work time: roughly 10 minutes.
- Discussion: roughly 5 minutes.
- Listen for query keys, loading UI, route-specific errors, mutation invalidation, and over-invalidation.
- Question before live coding: what did Network or [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools) show you?

## Show Manual Server State

- Open the patient and journal fetching code.
- Open Network, filter by Fetch/XHR, and navigate from Dashboard to Patients.
- Point out that both screens fetch patient data independently.
- Question: what are we manually handling?
- Answer: loading, errors, retries, stale data, cache, race conditions, and refetching after mutations.
- Mention the intermediate option: extract a custom hook with [`useEffect`](https://react.dev/reference/react/useEffect), but we still own cache, dedupe, stale data, invalidation, and race conditions.
- Link: React docs on [fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects).
- Say: [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) gives server state a standard shape.

## Add QueryClientProvider

- Open `apps/arena/src/main.tsx`.
- Add [`QueryClientProvider`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider) and create the `QueryClient`.
- Set `staleTime` and `retry`.
- Say: `staleTime` controls freshness. `retry` controls failed request retries.

## Create and Use usePatients

- Create `features/patients/hooks/usePatients.ts`.
- Add [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) with `queryKey: ['patients']` and `queryFn: fetchPatients`.
- Question: what should go in a [query key](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)?
- Answer: the stable identity of the data. Include variables when they change the response.
- Use `usePatients` in `PatientListPage` and `DashboardPage`.
- Render loading, error, and success states.
- Log real API errors with `logError`, but write friendly route-specific UI messages.
- Use the shared [`Skeleton`](https://ui.shadcn.com/docs/components/skeleton) primitive from `@medix/ui`, but export each skeleton from the component or page it represents.
- Open React Query Devtools and show that both screens use `['patients']`.
- Question: what code disappeared?
- Answer: local loading state, fetching effects, repeated fetch calls, and manual success/error bookkeeping.

## Fetch Patient Detail

- Open `pages/PatientDetailPage.tsx`.
- Use [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) with `queryKey: ['patient', id]`.
- Render loading, error, and success states.
- Write a recovery-oriented visible error message and log the technical error.
- Question: why does `id` belong in the query key?
- Answer: different patients are different cached data.
- Mention [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery) as an alternative: cleaner components, but loading moves to a parent [`Suspense`](https://react.dev/reference/react/Suspense) boundary.

## Create useJournals

- Create `features/journal/hooks/useJournals.ts`.
- Add [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) with `queryKey: ['journals', patientId]`.
- Use it in `JournalList`.
- Render loading, error, empty, and success states.
- Say: empty is not an error. It is a valid server response.

## Mutate Journal State

- In `JournalEntry.tsx`, add [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) for `updateJournalStatus`.
- Use [`useQueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient).
- On success, invalidate `['journals', patientId]`.
- Show the update request in Network and the journals query refetching in Devtools.
- If it fails, log the real error and show a short recovery message near the control.
- Question: why invalidate only this patient's journals?
- Answer: smaller invalidation means less unnecessary work.

## Submit Journal Form

- Keep form validation unchanged in this module.
- Use [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) for `createJournal`.
- On success, invalidate `['journals', patientId]` and reset the form.
- Show the POST request in Network.
- Put pending submit state near the button, not as a page-level spinner.
- Show a form-level recovery message if submit fails, without exposing API internals.

## Bonus

- Try optimistic journal creation with TanStack Query [`onMutate`](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates).
- Question: what must happen if the request fails after we already showed the new entry?
- Answer: restore or reconcile the UI so it matches the server again.
- Frame this as a final-app improvement, not the required workshop solution.

## Close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
