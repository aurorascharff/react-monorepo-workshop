# Module 4: Server State

Work in: `apps/arena`.

## Problem

Manual data fetching spreads loading, errors, retries, cache, refresh, and mutation behavior across components. Server state needs a consistent place to describe what data the UI depends on, and the UI needs loading, error, empty, busy, and success states that fit the screen.

## Task

1. Add TanStack Query to the Arena app setup with a `QueryClientProvider`.

2. Look at the manual fetching effects and the repeated loading/error state. Replace them with server-state hooks built with TanStack Query. Use query keys that describe the data, including the patient id for patient detail and journal data.

3. Design loading, error, empty, and success states where they matter. Use shared UI primitives such as `Skeleton` for loading states instead of a generic spinner, and shape the placeholder like the content that is coming. Error messages should be written for the route or workflow, not copied from the API.

4. Use mutations for journal status updates and new journal submit. Update or invalidate the affected journal data, not the whole app, so the UI stays connected to the server state. Log the real mutation error with the existing [`logError` helper](../apps/arena/src/lib/logger.ts) and show a safe recovery message to the user.

5. Use React Query Devtools and the Network tab to compare what happens during navigation, status updates, and form submit. Look for cache reuse, mutation requests, visible UI updates, and refetches after invalidation.

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
