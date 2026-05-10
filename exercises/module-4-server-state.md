# Module 4: Server State

Work in: `apps/arena`.

## Problem

Manual data fetching spreads loading, errors, retries, cache, refresh, and mutation behavior across components. Server state needs a consistent place to describe what data the UI depends on.

## Task

- Add server-state hooks for patients and journals.
- Replace manual patient and journal fetching effects with TanStack Query.
- Fetch patient detail with a query identified by patient id.
- Keep the existing shell-level error boundary.
- Add a local error boundary around patient detail so a failed patient request does not take down the whole route shell.
- Use mutations for journal status updates and new journal submit.
- Invalidate the affected journal data after successful mutations.
- Verify request and cache behavior during navigation, status updates, and form submit.

## Resources

- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
