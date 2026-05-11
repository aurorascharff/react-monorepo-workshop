# Exercise Four: Server State

## Problem

Manual data fetching spreads loading, errors, cache, refresh, and mutation behavior across components. Server state needs a consistent place to describe what data the UI depends on.

## Task

1. Add TanStack Query to the Arena app setup in [apps/arena/src/main.tsx](../apps/arena/src/main.tsx) with a `QueryClientProvider`.

2. Replace repeated patient fetching with a shared server-state hook in [usePatients](../apps/arena/src/features/patients/hooks/usePatients.ts). Use it from [DashboardPage](../apps/arena/src/pages/DashboardPage.tsx) and [PatientListPage](../apps/arena/src/pages/PatientListPage.tsx).

3. Replace manual patient detail and journal fetching with query hooks. Use [PatientDetailPage](../apps/arena/src/pages/PatientDetailPage.tsx) for the selected patient and [useJournals](../apps/arena/src/features/journal/hooks/useJournals.ts) for journal entries.

4. Design loading, error, empty, and success states where they matter. Use the shared [`Skeleton`](../packages/ui/src/base/skeleton.tsx) primitive for loading states, shaped like the content that is coming. Error messages should be written for the route or workflow, not copied from the API.

5. Use mutations for journal status updates in [JournalEntry](../apps/arena/src/features/journal/components/JournalEntry.tsx) and new journal submit in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx). Update or invalidate the affected journal data. Log the real mutation error with the existing [`logError` helper](../apps/arena/src/lib/logger.ts) and show a safe recovery message to the user.

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
