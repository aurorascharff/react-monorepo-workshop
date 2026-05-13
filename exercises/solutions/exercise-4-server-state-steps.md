# Exercise Four: Server State — Walkthrough

> Companion to [`exercise-4-server-state.md`](../exercise-4-server-state.md). Read the brief first; come back here for one workable order of operations with the rationale.

## Problem

Two problems on top of each other: server-state mechanics (loading, errors, cache, retries, refresh) spread across components, plus state lifted to the page and threaded back down through callbacks (`onCreated`, `onStatusChange`). [TanStack Query](https://tanstack.com/query) fixes both — [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) and [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) sit inside the components that care, and the shared [`QueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClient) cache dedupes their requests. Pages stop being data-flow plumbing.

> **Supply-chain hygiene before installing anything.** Recent TanStack releases were part of a supply-chain incident — see the [Socket write-up](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack), the [Mini Shai-Hulud tracker](https://socket.dev/supply-chain-attacks/mini-shai-hulud), and [TanStack issue #7383](https://github.com/TanStack/router/issues/7383). Verify the package name, use the committed lockfile, check advisories.

## Task

### 1. Add `QueryClientProvider`

In [`apps/arena/src/main.tsx`](../../apps/arena/src/main.tsx), create a [`QueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClient) and wrap the app with [`QueryClientProvider`](https://tanstack.com/query/latest/docs/framework/react/reference/QueryClientProvider):

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

> [`staleTime`](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) is how long data stays fresh — refetches skipped within the window. `retry` is how many times a failed request retries. Both are project defaults; individual queries can override them. The shared `QueryClient` is what makes the rest of this module possible: any component, any depth, can hit the same cache.

### 2. Shared data through a hook (`usePatients`) — called from components, not pages

Define the query once and let each component call it directly. In [`features/patients/hooks/usePatients.ts`](../../apps/arena/src/features/patients/hooks/usePatients.ts):

```ts
export function usePatients() {
  return useQuery({ queryKey: ['patients'], queryFn: fetchPatients })
}
```

`PatientList` drops its `patients` prop and calls `usePatients()` itself, rendering its own loading / error / empty branches. `PatientListPage` collapses to `<h1>` + `<PatientList />`.

For the dashboard, split the page into self-fetching subcomponents — [`DashboardStats`](../../apps/arena/src/features/patients/components/DashboardStats.tsx) and [`RecentPatients`](../../apps/arena/src/features/patients/components/RecentPatients.tsx). Each calls `usePatients()` and renders its own slice. The page becomes pure layout.

Open the [React Query Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools): three components all using `['patients']` share **one** cache entry, **one** network request.

> [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) are the stable identity of the data. Include variables when they change the response (`['patient', id]`, `['journals', patientId]`).

> **Three components calling the same hook isn't waste** — TanStack Query dedupes by key. Same `data` reference, one fetch.

### 3. Replace manual patient detail and journal fetching with query hooks

Two pieces, same pattern: the page query is owned by the page, the journal query moves _down_ into the component that renders entries.

**Patient detail in [`pages/PatientDetailPage.tsx`](../../apps/arena/src/pages/PatientDetailPage.tsx)** — keep the route-param guard in the page, then move the query into a child that receives a definite `id: string`:

```tsx
export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  if (!id) return null

  return <PatientDetailContent id={id} />
}
```

Inside `PatientDetailContent`, replace the manual fetch with [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery):

```tsx
const {
  data: patient,
  isLoading,
  error,
} = useQuery({
  queryKey: ['patient', id],
  queryFn: () => fetchPatient(id),
})
```

The API helper still receives a required `string`; don't loosen it to accept `undefined`. The page now owns one query and renders three states. It doesn't own journals anymore, and it doesn't pass any callbacks down. `id` belongs in the query key because different patients are different cached data — `['patient', 'abc']` and `['patient', 'def']` are independent entries.

**Journal entries via [`features/journal/hooks/useJournals.ts`](../../apps/arena/src/features/journal/hooks/useJournals.ts):**

```ts
export function useJournals(patientId: string) {
  return useQuery({
    queryKey: ['journals', patientId],
    queryFn: () => fetchJournals(patientId),
  })
}
```

Change `JournalList`'s props to just `{ patientId }`. Call `useJournals(patientId)` inside:

```tsx
export function JournalList({ patientId }: { patientId: string }) {
  const { data: entries, isLoading, error } = useJournals(patientId)
  // …loading / error / empty / success branches
  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} patientId={patientId} />
      ))}
    </div>
  )
}
```

The page no longer threads `journals` or `isLoading` through. `<JournalList patientId={id} />` is the full call site. The page got smaller; the list got more capable.

### 4. Design loading, error, empty, and success states

Each self-fetching component renders its own states — no spinner at the page level, no error state buried in the parent.

**Skeletons:** use the shared [`Skeleton`](../../packages/ui/src/base/skeleton.tsx) primitive ([shadcn/ui](https://ui.shadcn.com/docs/components/skeleton)) shaped like the content. Export each skeleton from the same file as the real component (`PatientListSkeleton` next to `PatientList`, etc.) — they stay in sync because they live next to each other.

**Errors via `<ErrorState>`:** [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) doesn't throw; it returns `{ error }`. Each self-fetching component renders its own inline `<ErrorState>`:

```tsx
if (isLoading) return <JournalListSkeleton />
if (error) return <ErrorState title="Journal entries are unavailable" error={error} … />
if (!entries || entries.length === 0) return <p>No journal entries yet</p>
```

Write messages for the workflow, not the API.

**Drop the inner `<ErrorBoundary>` from Exercise One.** `<ErrorState>` already produces the contextual fallback on query failure; an inner boundary on the same region would only catch render bugs, but it would show the same fallback. Defense in depth with no UX delta. The layout-level boundary remains as the catch-all. The pattern flips for [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery), which throws — there the boundary is the only error path (Bonus 2).

> **Empty is not an error.** Three branches before success, not two.

### 5. Extract mutations into hooks

Same idea as queries — give each mutation its own hook in the feature folder. The component calls the hook and only handles the parts that are component-local (UI state, form resets).

**`features/journal/hooks/useUpdateJournalStatus.ts`** — owns the mutation, the invalidation, and the error log:

```ts
export function useUpdateJournalStatus(entryId: string, patientId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (status: JournalStatus) => updateJournalStatus(entryId, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] }),
    onError: (error) => logError(error, 'Journal status mutation failed'),
  })
}
```

`JournalEntry` shrinks to:

```tsx
const { mutate, error } = useUpdateJournalStatus(entry.id, patientId)

<Select value={entry.status} onValueChange={(v) => mutate(v as JournalStatus)}>…</Select>
{error && <p className="text-destructive">We could not update the journal status. Try again.</p>}
```

**`features/journal/hooks/useCreateJournal.ts`** — same shape:

```ts
export function useCreateJournal(patientId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: NewJournal) => createJournal(patientId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] }),
    onError: (error) => logError(error, 'Create journal mutation failed'),
  })
}
```

`JournalForm` keeps form-local concerns (`reset()`) in a per-call callback:

```tsx
const { mutate, isPending, error } = useCreateJournal(patientId)

function submitJournal(data) {
  mutate(data, { onSuccess: () => form.reset() })
}
```

Show pending state near the button. Render mutation errors form-level — without exposing API internals.

> **Why a hook for two-line mutations?** Same reason as queries: the data layer becomes one named thing per concern. If the cache strategy changes, only the hook moves. The component is just `mutate` + render. It also means the optimistic-update bonus (below) has a natural home — `useCreateJournal` gets richer; `JournalForm` stays unchanged.

> [Invalidating](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) only `['journals', patientId]` re-runs that one query — other patients' caches stay intact. The page never sees the mutation.

### 6. Compare via Devtools and Network

- Dashboard → Patients: second visit hits the cache (no network call).
- Status change: PATCH in Network, journals query refetching in Devtools.
- New journal submit: POST visible, list refreshes automatically.
- `PatientDetailPage` is now data + pure JSX — no callbacks, no flags, no `useEffect`.

## Bonus

### 1. Optimistic journal creation

Push the [`onMutate`](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) / rollback / replace flow _into the existing hook_ — `useCreateJournal` gets richer; `JournalForm` doesn't change at all:

```ts
export function useCreateJournal(patientId: string) {
  const queryClient = useQueryClient()
  const journalsKey = ['journals', patientId] as const

  return useMutation({
    mutationFn: (data) => createJournal(patientId, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: journalsKey })
      const previous = queryClient.getQueryData<Journal[]>(journalsKey)
      const optimisticId = `optimistic-${Date.now()}`
      queryClient.setQueryData<Journal[]>(journalsKey, (entries) => [
        { id: optimisticId, patientId, ...data, status: 'draft' },
        ...(entries ?? []),
      ])
      return { previous, optimisticId }
    },
    onError: (_e, _d, ctx) =>
      queryClient.setQueryData(journalsKey, ctx?.previous),
    onSuccess: (created, _d, ctx) => {
      queryClient.setQueryData<Journal[]>(journalsKey, (entries) =>
        entries?.map((e) => (e.id === ctx?.optimisticId ? created : e)),
      )
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: journalsKey }),
  })
}
```

> The whole optimistic flow lives inside the hook. `JournalForm` still just calls `useCreateJournal(patientId)` and renders. That's the payoff for extracting mutations into hooks — the strategy changes, the component doesn't.

### 2. Try `useSuspenseQuery` for one read

Convert the patient detail read to [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery). Because Exercise Four removed the inner query boundary, add a local `<ErrorBoundary>` back around this experiment and put `<Suspense>` inside it. The component body becomes pure data + render — no `isLoading`/`error` guards.

## Resources

- [TanStack Query: overview](https://tanstack.com/query/latest/docs/framework/react/overview) · [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries) · [Query keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys) · [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) · [Invalidation](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation) · [Optimistic updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) · [Important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) · [Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) · [`useSuspenseQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery) · [`useQueryClient`](https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient)
- [React: Fetching data with Effects](https://react.dev/reference/react/useEffect#fetching-data-with-effects) · [`Suspense`](https://react.dev/reference/react/Suspense)
- [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/skeleton)
- [Socket: TanStack supply-chain write-up](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack) · [Mini Shai-Hulud tracker](https://socket.dev/supply-chain-attacks/mini-shai-hulud) · [TanStack issue #7383](https://github.com/TanStack/router/issues/7383)
