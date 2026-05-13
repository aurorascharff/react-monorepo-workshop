# Exercise Three: State and Effects — Walkthrough

> Companion to [`exercise-3-state-and-effects.md`](../exercise-3-state-and-effects.md). Read the brief first; come back here for one workable order of operations with the rationale.

## Problem

The problem isn't state — it's state that can disagree with other state, props, or identity. Which values are facts, which can be calculated from facts we already have, which choices should be represented as one value instead of several booleans, and which state should reset when the thing on screen changes? Less duplicated state means fewer impossible states, fewer sync effects, and fewer stale UI leftovers.

[`useEffect`](https://react.dev/reference/react/useEffect) is for synchronizing with systems outside React: network, timers, subscriptions, browser APIs, third-party widgets. It is [usually the wrong tool](https://react.dev/learn/you-might-not-need-an-effect) for keeping React state in sync with other React state.

Two places store what they could compute:

- `DashboardPage` keeps `total` / `female` / `male` in [`useState`](https://react.dev/reference/react/useState) and recomputes them via `useEffect` when `patients` changes.
- `PatientList` splits one gender choice into `showMalePatients` / `showFemalePatients`, then keeps `filteredPatients` in `useState` and syncs it from `patients`, `search`, and those booleans.

There is also one place where identity matters: `PatientDetailPage` renders a journal form for the current patient. If the `id` changes while that route stays mounted, the form's local draft/error/submitting state should belong to the new patient, not leak from the previous one.

> [Context](https://react.dev/learn/passing-data-deeply-with-context) avoids prop drilling, but it doesn't make duplicated state safer. If you find yourself reaching for it to "fix" sync issues, the underlying problem is still stored derived state.

## Task

### 1. Remove dashboard derived state

In [`pages/DashboardPage.tsx`](../../apps/arena/src/pages/DashboardPage.tsx), delete the `stats` `useState` and the `useEffect` that resets it. Compute the totals during render:

```tsx
const total = patients?.length ?? 0
const female = patients?.filter((p) => p.gender === 'female').length ?? 0
const male = patients?.filter((p) => p.gender === 'male').length ?? 0
```

One source of truth (`patients`) — three derived values.

> **Do you need [`useMemo`](https://react.dev/reference/react/useMemo)?** Start with a plain calculation. Reach for `useMemo` when cost or referential identity matters — and remember the [React Compiler](https://react.dev/learn/react-compiler) is enabled, so most cases are memoized for you.

### 2. Collapse the filter state and stop syncing `filteredPatients`

In [`features/patients/components/PatientList.tsx`](../../apps/arena/src/features/patients/components/PatientList.tsx), replace the two boolean states with one state value:

```tsx
type GenderFilter = 'all' | 'male' | 'female'

const [genderFilter, setGenderFilter] = useState<GenderFilter>('all')
```

`showMalePatients` and `showFemalePatients` can represent combinations the UI does not really have, like both false. A single `genderFilter` value matches the control: one select, one selected option.

Then remove `filteredPatients` state and the effect that syncs it. Compute the filtered list during render:

```tsx
const filteredPatients = patients.filter((p) => {
  const matchesSearch =
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(search.toLowerCase())
  const matchesGender = genderFilter === 'all' || p.gender === genderFilter
  return matchesSearch && matchesGender
})
```

Keep `useState` only for what the user controls: `search` and `genderFilter`. Those are facts; the filtered list is derived.

> Storage is for user input, server responses, and real UI choices. Anything computable, compute. Anything mutually exclusive should usually be one value, not several booleans.

### 3. Reset patient-local form state with `key`

[`pages/PatientDetailPage.tsx`](../../apps/arena/src/pages/PatientDetailPage.tsx) is driven by the URL patient id. The form is local UI state for one patient. If the route changes from `/patients/p1` to `/patients/p2`, we don't want to add an effect inside `JournalForm` that says "when `patientId` changes, clear everything." Tell React that this is a different form instance:

```tsx
<JournalForm key={id} patientId={id} onCreated={handleCreated} />
```

The same idea works for any subtree whose local state belongs to a specific identity.

> **Why not reset in an effect?** Because the reset is not synchronization with an external system. It is a component identity decision. A different `key` tells React to unmount the old state and mount fresh state for the new patient. See [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state).

### 4. Extract `usePatientFilter`

`search`, `setSearch`, `genderFilter`, `setGenderFilter`, and `filteredPatients` belong together. Move them into a [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) at [`features/patients/hooks/usePatientFilter.ts`](../../apps/arena/src/features/patients/hooks/usePatientFilter.ts):

```ts
export function usePatientFilter(patients: Patient[]) {
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  const filteredPatients = patients.filter((p) => {
    /* ... */
  })
  return { search, setSearch, genderFilter, setGenderFilter, filteredPatients }
}
```

In `PatientList`:

```tsx
const { search, setSearch, genderFilter, setGenderFilter, filteredPatients } =
  usePatientFilter(patients)
```

The component owns the UI; the hook owns the filtering logic.

> A [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) is reusable component logic, not a service class. It can call other hooks — the debounce step uses that.

### 5. Add `useDebounce`

A timer is real synchronization with something outside React, so `useEffect` is the right tool here. Create [`hooks/useDebounce.ts`](../../apps/arena/src/hooks/useDebounce.ts):

```ts
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
```

Use it inside `usePatientFilter`:

```ts
const debouncedSearch = useDebounce(search, 300)
// ...filter on debouncedSearch instead of search
return { search, setSearch, genderFilter, setGenderFilter, filteredPatients }
```

> **Why is this effect OK when the dashboard one wasn't?** This synchronizes with a [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) timer — outside React. The cleanup (`clearTimeout`) prevents stale timers from firing after the value changes again. Libraries like [use-hooks](https://use-hooks.com/useDebounce) ship one too; writing it once makes the pattern clear.

## Bonus

### 1. Clear filters without extra state

Add a "Clear filters" button that calls `setSearch('')` and `setGenderFilter('all')`. Don't add a separate `hasFilters` state — compute it:

```ts
const hasFilters = search !== '' || genderFilter !== 'all'
```

> Existing setters are enough. Derived state stays derived — including booleans.

### 2. Try `useDeferredValue`

Swap `useDebounce` for [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) on the search value. Debounce skips work between keystrokes; `useDeferredValue` keeps the input snappy and renders the previous filtered list while the new one is computed.

> Often `useDeferredValue` feels better for in-render computation. Debounce is simpler for work that involves network calls.

## Resources

- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) · [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [`useMemo`](https://react.dev/reference/react/useMemo) · [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) · [`useEffect`](https://react.dev/reference/react/useEffect)
- [React Compiler](https://react.dev/learn/react-compiler)
- [MDN: `setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) · [use-hooks `useDebounce`](https://use-hooks.com/useDebounce)
