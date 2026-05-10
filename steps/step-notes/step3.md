# Step 3: State and Effects

## Frame what we are solving

- Say: the problem is not state itself. The problem is state that can disagree with other state or props.
- Ask: which values are facts, and which values can be calculated from facts we already have?
- Land this: less duplicated state means fewer impossible states.
- Show Module 3 in [`exercises/module-3-state-and-effects.md`](../../exercises/module-3-state-and-effects.md).

## Participant work (roughly 10 minutes)

- Ask participants to work in `apps/arena`.
- Listen for "Should this be state?", "Do we need `useMemo`?", "Is this a good `useEffect`?", and confusion between derived state and external synchronization.

## Group discussion (roughly 5 minutes)

- Focus on which state people removed, which effects felt suspicious, and where the line between derived state and synchronization was unclear.
- Land this point: less state means fewer impossible states. Effects are for external systems, not for keeping React values in sync with each other.
- Ask before live coding: which state did you remove, and which effects did you leave alone?

## App: Frame the problem

- Open the code that stores values we can calculate.
- Avoid using [`useEffect`](https://react.dev/reference/react/useEffect) to synchronize React state with other React state.
- Mention [Context](https://react.dev/learn/passing-data-deeply-with-context) briefly if it comes up: Context lets descendants read a value from the closest Provider without passing props through every layer, but it does not make duplicated state safer.
- Which state did you delete or consider deleting when you tried this?
- Answer to land: stats derived from patients, and filter results derived from search/filter inputs.
- What is `useEffect` for?
- Answer to land: synchronize with systems outside React, like network, timers, subscriptions, browser APIs, or third-party widgets.
- Only remove effects whose job is to keep React values in sync with other React values.
- Relate back to the background: network and timers are outside React, so effects are about crossing that boundary. Derived state is not.

## App: Remove derived dashboard state

- Open `apps/arena/src/pages/DashboardPage.tsx`.
- Find the stats state.
- Can `total`, `female`, and `male` be calculated from `patients`?
- Answer to land: yes. They are derived values, so we can calculate them during render from `patients`.
- Remove the effect that updates stats from patients.
- Compute `total`, `female`, and `male` directly during render.
- Derived state is data we can calculate from props or existing state. If we store it too, we create two sources of truth.
- Did removing this state make the component easier to reason about?
- Answer to land: yes, because there is no longer a separate state value that can get out of sync with `patients`.
- [`useMemo`](https://react.dev/reference/react/useMemo) only briefly: start with normal render calculation. Reach for `useMemo` when the calculation is expensive or identity matters.

## App: Extract usePatientFilter

- Open `PatientList`.
- `search`, `genderFilter`, and `filteredPatients`.
- Is this UI state, domain logic, or reusable component logic?
- Answer to land: it is reusable component logic. The state belongs to the patient filtering interaction, and the filtered result is derived from that state and the patients.
- Create `features/patients/hooks/usePatientFilter.ts`.
- Move `search`, `setSearch`, `genderFilter`, `setGenderFilter`, and `filteredPatients` into the hook.
- Return the values the component needs.
- Use `usePatientFilter(patients)` in `PatientList`.
- [Custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks): a function that uses React hooks. It is not a service class. It is reusable component logic.

## App: Add useDebounce

- Create `hooks/useDebounce.ts`.
- Store the debounced value in state.
- Use [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) in an effect.
- Clear the timeout in the effect cleanup.
- Use the debounced search value inside `usePatientFilter`.
- Why is this effect okay when the previous ones were not?
- Answer to land: we are synchronizing with a timer, which is outside React.
- Relate back to latency: debounce is one way to handle time in the browser, even before we talk about server state.

## Check and module close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
