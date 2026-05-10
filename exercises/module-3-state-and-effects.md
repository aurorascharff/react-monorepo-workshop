# Module 3: State and Effects

Work in: `apps/arena`.

## Problem

Some values are stored in state even though they can be calculated from existing data or user input. That creates extra synchronization work and makes the UI easier to get out of sync.

## Task

1. In the dashboard, remove state that duplicates information already available from patient data. Calculate the totals during render instead.

2. In the patient list, keep state for the user's filter choices, but derive the filtered patients from existing data.

3. Extract the patient filtering behavior into a `usePatientFilter` hook so the component owns the UI and the hook owns the reusable filtering logic.

4. Add a `useDebounce` hook for the search value. The timer belongs in an effect because it synchronizes with something outside React.

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
