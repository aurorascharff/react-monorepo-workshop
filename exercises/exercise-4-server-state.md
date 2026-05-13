# Exercise Four: Server State

## Problem

Manual data fetching spreads loading, errors, cache, and mutations across components. And because state lives on the page, callbacks like `onCreated` and `onStatusChange` get threaded down through props — change one thing, several files move. Server state needs one shape, owned by the components that use it.

## Task

If your structure differs from the reference files, make the same kind of change in the equivalent place in your app.

1. Add TanStack Query to the Arena app with a `QueryClientProvider`.

2. Replace repeated patient fetching with a shared hook (e.g. `usePatients`). Components should call it directly — `PatientList`, plus dashboard subcomponents like `DashboardStats` and `RecentPatients`. Pages should compose them.

3. Replace manual patient detail and journal fetching with query hooks. The page should own the patient query; journal fetching should move into a `useJournals` hook called from `JournalList`. Drop the `journals` / `isLoading` props that used to flow from the page.

4. Design loading, error, empty, and success states inside each self-fetching component, using the shared `Skeleton` primitive shaped like the content. With `<ErrorState>` covering `useQuery` errors, drop the contextual `<ErrorBoundary>` from Exercise One and keep the layout-level boundary as the catch-all.

5. Extract mutations into hooks in the same feature folder (e.g. `useUpdateJournalStatus`, `useCreateJournal`). Each hook should own its `mutationFn`, cache invalidation, and error logging. `JournalEntry` and `JournalForm` should call the hook and use `mutate` / `isPending` / `error`.

6. Use React Query Devtools and the Network tab to compare what happens during navigation, status updates, and form submit. Look for cache reuse, mutation requests, visible UI updates, and refetches after invalidation.

## Bonus

1. Make journal creation optimistic: add the new entry to the journal list immediately, replace it with the server response on success, and restore the form data if the request fails.

2. Try `useSuspenseQuery` for one read path and compare where loading and error UI move.

## Resources

- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React: Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)
- [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
- [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [useSuspenseQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery)
