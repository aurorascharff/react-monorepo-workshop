# Module 4: TanStack Query

Goal: handle server state declaratively.

Work in `apps/arena`.

## Exercise

Move API data handling out of manual component effects and into a server-state approach.

The patient list, patient detail, journals, status updates, and new journal submit should have clear loading, error, success, and refresh behavior. Keep failures local where possible so the app shell remains usable.

## Check Your Work

- Loading and error states are visible.
- Navigating away and back reuses cached data.
- Changing journal status updates the UI after the mutation succeeds.
- The app shell stays visible if patient detail loading fails.
- After a status change, the Network tab shows the update request and React Query Devtools shows the affected data updating.

## Resources

- [TanStack Query overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Query invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation)
