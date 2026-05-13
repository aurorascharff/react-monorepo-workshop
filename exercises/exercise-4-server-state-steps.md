# Exercise Four: Server State — Walkthrough

> Companion to [`exercise-4-server-state.md`](exercise-4-server-state.md). Read the brief first; come back here for one workable order of operations with the rationale.

## Problem

The problem isn't `fetch` — it's waiting, errors, stale data, race conditions, retries, and refresh after mutations. Server state needs a standard shape: cache identity, loading, error, busy, refresh.

Open Network in DevTools, filter by Fetch/XHR, and navigate from Dashboard to Patients. Both screens fetch patients independently — and we're manually handling loading, errors, retries, stale data, cache, race conditions, and refetching. [TanStack Query](https://tanstack.com/query) gives all of that one place to live.

> An intermediate option is to wrap [`useEffect` + `fetch`](https://react.dev/reference/react/useEffect#fetching-data-with-effects) in a custom hook — but you still own cache, dedupe, stale data, invalidation, and race conditions. That's what we're trading away here.

> **Before installing anything: supply-chain hygiene.** Recent TanStack releases were part of a supply-chain incident — see the [Socket write-up](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack), the [Mini Shai-Hulud incident tracker](https://socket.dev/supply-chain-attacks/mini-shai-hulud), and [TanStack issue #7383](https://github.com/TanStack/router/issues/7383). The habit isn't panic — verify the package name, use pinned versions and a committed lockfile, check advisories when something is fresh, and be careful with install-time scripts.

## Task

### 1. Add `QueryClientProvider`

In [`apps/arena/src/main.tsx`](../apps/arena/src/main.tsx), create a [`QueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClient) and wrap the app with [`QueryClientProvider`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider):

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60, retry: 1 } },
})

<QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

> [`staleTime`](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) is how long data stays fresh — refetches skipped within the window. `retry` is how many times a failed request retries. Both are project defaults; individual queries can override them.

### 2. Create and use `usePatients`

In [`features/patients/hooks/usePatients.ts`](../apps/arena/src/features/patients/hooks/usePatients.ts):

```ts
import { useQuery } from '@tanstack/react-query'

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  })
}
```

Use `usePatients()` in both `PatientListPage` and `DashboardPage`. Render loading, error, and success from `{ data, isLoading, error }`. Log real API errors with [`logError`](../apps/arena/src/lib/logger.ts); write friendly route-specific UI copy:

```tsx
const { data: patients, isLoading, error } = usePatients()

if (isLoading) return <DashboardSkeleton />
if (error) return <ErrorState title="Dashboard is unavailable" error={error} ... />
```

Build loading UI with the shared [`Skeleton`](../packages/ui/src/base/skeleton.tsx) primitive ([shadcn/ui](https://ui.shadcn.com/docs/components/skeleton)), shaped like the content that's coming. Place each shaped skeleton next to the component it represents — for example export `PatientListSkeleton` from `PatientList.tsx`. Loading shape and real shape stay in sync when one changes.

Open the [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools). Both pages should share one `['patients']` cache entry.

> [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) are the stable identity of the data. Include variables when they change the response (the patient `id` in step 3, the `patientId` in step 4).

> **What code disappeared?** Local loading state, the fetching effect, repeated fetch calls, manual error bookkeeping. Same key in two places shares one cache entry — no extra request the second time.

### 3. Use queries for patient detail

In [`pages/PatientDetailPage.tsx`](../apps/arena/src/pages/PatientDetailPage.tsx), replace the manual fetch with [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery):

```tsx
const { data: patient, isLoading, error } = useQuery({
  queryKey: ['patient', id],
  queryFn: () => fetchPatient(id),
})
```

Render loading, error, success. Write a recovery-oriented visible message; log the technical error with `logError`.

> `id` belongs in the query key because different patients are different cached data. `['patient', 'abc']` and `['patient', 'def']` are independent entries.

> **Alternative: [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery).** Returns `data` directly (no `isLoading`/`error` guards). Loading moves to a parent [`<Suspense>`](https://react.dev/reference/react/Suspense), errors to a parent `<ErrorBoundary>`:
>
> ```tsx
> <ErrorBoundary title="Patient details are unavailable" ...>
>   <Suspense fallback={<PatientDetailSkeleton />}>
>     <PatientDetailContent id={id} />
>   </Suspense>
> </ErrorBoundary>
> ```
>
> Cleaner read path, but loading/error UX moves up the tree.

### 4. Create `useJournals` and render states

In [`features/journal/hooks/useJournals.ts`](../apps/arena/src/features/journal/hooks/useJournals.ts):

```ts
export function useJournals(patientId: string) {
  return useQuery({
    queryKey: ['journals', patientId],
    queryFn: () => fetchJournals(patientId),
  })
}
```

Use it in `JournalList`. Render loading, error, empty, and success:

```tsx
if (isLoading) return <JournalListSkeleton />
if (error) return <ErrorState ... />
if (!entries || entries.length === 0) return <p>No journal entries yet</p>
```

> Empty is not an error. Loading is "we don't know yet"; empty is "we know, and there's nothing."

### 5. Use mutations for status updates and submit

#### Status change in `JournalEntry`

```tsx
const queryClient = useQueryClient()

const { mutate, error } = useMutation({
  mutationFn: (status: JournalStatus) => updateJournalStatus(entry.id, status),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['journals', patientId] }),
  onError: (error) => logError(error, 'Journal status mutation failed'),
})

<Select value={entry.status} onValueChange={(v) => mutate(v as JournalStatus)}>...</Select>

{error && <p className="text-destructive">We could not update the journal status. Try again.</p>}
```

Watch the request in DevTools Network; watch the journals query refetch in the React Query Devtools.

> [Invalidating](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) only `['journals', patientId]` re-runs that one query — other patients' caches stay intact. Smaller invalidation = less unnecessary work.

#### Form submit in `JournalForm`

Keep form validation unchanged for this module — Exercise 5 rewrites it. Replace manual submit handling with [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) for `createJournal`. On success, invalidate `['journals', patientId]` and reset the form. Show pending state near the button, not as a page-level spinner. Show form-level recovery on failure — without exposing API internals.

### 6. Compare via Devtools and Network

- Dashboard → Patients: second visit hits cache (no network call).
- Journal status change: PATCH in Network, journals query refetching in Devtools.
- New journal submit: POST visible, list refreshes automatically.

> Cache reuse across navigation, mutation requests, visible UI updates, refetches after invalidation — none of it written into individual components.

## Bonus

### 1. Optimistic journal creation

Use [`onMutate`](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) to update the cache before the network call, then reconcile in `onSuccess` or roll back in `onError`:

```tsx
useMutation({
  mutationFn: (data) => createJournal(patientId, data),
  onMutate: async (data) => {
    await queryClient.cancelQueries({ queryKey: ['journals', patientId] })
    const previous = queryClient.getQueryData(['journals', patientId])
    queryClient.setQueryData(['journals', patientId], (entries) => [
      { id: `optimistic-${Date.now()}`, ...data, status: 'draft' },
      ...(entries ?? []),
    ])
    return { previous }
  },
  onError: (_e, _d, ctx) => queryClient.setQueryData(['journals', patientId], ctx?.previous),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['journals', patientId] }),
})
```

> If the request fails after the UI already updated, the `onError` rollback uses the `onMutate` snapshot. `onSettled` reconciles either way.

### 2. Try `useSuspenseQuery` for one read

Convert the patient detail read to [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery). Wrap the call site in a local `<Suspense>` and `<ErrorBoundary>`. The component body becomes pure data + render — no `isLoading`/`error` guards.

## Resources

- [TanStack Query: overview](https://tanstack.com/query/latest/docs/framework/react/overview) · [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries) · [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) · [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) · [Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) · [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) · [Important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) · [Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) · [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery) · [`useQueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient)
- [React: Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects) · [`Suspense`](https://react.dev/reference/react/Suspense)
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Socket: TanStack supply-chain write-up](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack) · [Mini Shai-Hulud tracker](https://socket.dev/supply-chain-attacks/mini-shai-hulud) · [TanStack issue #7383](https://github.com/TanStack/router/issues/7383)
