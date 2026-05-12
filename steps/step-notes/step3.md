# Step 3: State and Effects

## Before They Work

- Say: the problem is not state. The problem is state that can disagree with other state or props.
- Question: which values are facts, and which values can be calculated from facts we already have?
- Answer: less duplicated state means fewer impossible states.
- Show Exercise Three in [`exercises/exercise-3-state-and-effects.md`](../../exercises/exercise-3-state-and-effects.md).

## Participant Work

- Work time: roughly 10 minutes.
- Discussion: roughly 5 minutes.
- Listen for “Should this be state?”, “Do we need `useMemo`?”, and confusion between derived state and external synchronization.
- Question before live coding: which state did you remove, and which effects did you leave alone?

## Frame the Problem

- Open code that stores values we can calculate.
- Say: avoid [`useEffect`](https://react.dev/reference/react/useEffect) to synchronize React state with other React state.
- Mention [Context](https://react.dev/learn/passing-data-deeply-with-context) if it comes up: it avoids prop drilling, but it does not make duplicated state safer.
- Question: what is `useEffect` for?
- Answer: synchronizing with systems outside React: network, timers, subscriptions, browser APIs, or third-party widgets.

## Remove Dashboard Derived State

- Open `apps/arena/src/pages/DashboardPage.tsx`.
- Find the stats state.
- Question: can `total`, `female`, and `male` be calculated from `patients`?
- Answer: yes. They are derived values.
- Remove the effect that updates stats from patients.
- Compute the values during render.
- Say: storing derived values creates two sources of truth.
- Mention [`useMemo`](https://react.dev/reference/react/useMemo) briefly: start with render calculation; use memoization when calculation cost or identity matters. React compiler however makes this not needed most of the time.

## Extract usePatientFilter

- Open `PatientList`.
- Question: is `search`, `genderFilter`, and `filteredPatients` UI state, domain logic, or reusable component logic?
- Answer: reusable component logic for the filtering interaction.
- Create `features/patients/hooks/usePatientFilter.ts`.
- Move `search`, `setSearch`, `genderFilter`, `setGenderFilter`, and `filteredPatients` into the hook.
- Use `usePatientFilter(patients)` in `PatientList`.
- Say: a [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks) is reusable component logic, not a service class.

## Add useDebounce

- Create `hooks/useDebounce.ts`.
- Store the debounced value in state.
- Use [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) in an effect and clear it in cleanup.
- Use the debounced search value inside `usePatientFilter`.
- Question: why is this effect okay when the previous ones were not?
- Answer: this synchronizes with a timer, which is outside React.
- Relate to latency: debounce is one way to handle time in the browser before server state enters the picture.

## Bonus

- Add a clear-filters action that resets `search` and `genderFilter` from `usePatientFilter`. Question: did you need extra state, or are the existing setters enough? Answer: existing setters are enough — derived state stays derived.
- Try [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue) for the search value instead of `useDebounce`. Compare how each one feels: debounce skips work between keystrokes, `useDeferredValue` keeps the input snappy and renders the previous filtered list while the new one is computed.

## Close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
