# Module 3: State and Effects

Work in: `apps/arena`.

## Problem

Some values are stored in state even though they can be calculated from existing data or user input. That creates extra synchronization work and makes the UI easier to get out of sync.

## Task

- Remove dashboard stats state and calculate the patient totals during render.
- Keep patient filtering state for the user's search and gender filter choices.
- Derive the filtered patient list from the patients and filter state.
- Extract the patient filtering interaction into a `usePatientFilter` hook.
- Add a `useDebounce` hook for the search value.
- Keep the timer effect inside `useDebounce`, because the timer is outside React.

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
