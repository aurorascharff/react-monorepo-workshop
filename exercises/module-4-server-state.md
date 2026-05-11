# Module 4: Server State

Work in: `apps/arena`.

## Problem

Manual data fetching spreads loading, errors, retries, cache, refresh, and mutation behavior across components. Server state needs a consistent place to describe what data the UI depends on, and the UI needs loading, error, empty, busy, and success states that fit the screen.

## Task

1. Add TanStack Query to the Arena app setup with a `QueryClientProvider`.

2. Look at the manual fetching effects and the repeated loading/error state. Replace them with server-state hooks built with TanStack Query. Use query keys that describe the data, including the patient id for patient detail and journal data.

3. Design loading, error, empty, and success states where they matter. Use shared UI primitives such as `Skeleton` for loading states instead of a generic spinner, and shape the placeholder like the content that is coming.

4. Use mutations for journal status updates and new journal submit. After a successful mutation, invalidate the affected journal data, not the whole app, so the UI refreshes from the server.

5. Use React Query Devtools and the Network tab to compare what happens during navigation, status updates, and form submit. Look for cache reuse, mutation requests, pending states, and refetches after invalidation.

## Bonus

Make the journal status mutation optimistic. The selected status should update immediately, roll back if the request fails, and still refetch the affected journal data afterward.

## Resources

- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React: Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects)
- [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
- [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
- [useSuspenseQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery)
