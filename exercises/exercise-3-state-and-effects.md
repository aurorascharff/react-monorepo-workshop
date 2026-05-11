# Exercise Three: State and Effects

## Problem

Some values are stored in state even though they can be calculated from existing data or user input. That creates extra synchronization work and makes the UI easier to get out of sync.

## Task

1. In the dashboard page at [apps/arena/src/pages/DashboardPage.tsx](../apps/arena/src/pages/DashboardPage.tsx), remove state and effects that duplicate information already available from patient data. Calculate the totals during render instead.

2. In the patient list at [apps/arena/src/features/patients/components/PatientList.tsx](../apps/arena/src/features/patients/components/PatientList.tsx), keep state for the user's filter choices, but derive the filtered patients from existing data. The search and gender filter should keep working.

3. Extract the patient filtering behavior into a [`usePatientFilter`](../apps/arena/src/features/patients/hooks/usePatientFilter.ts) hook so the component owns the UI and the hook owns the reusable filtering logic.

4. Add a [`useDebounce`](../apps/arena/src/hooks/useDebounce.ts) hook for the search value. The timer belongs in an effect because it synchronizes with something outside React, and the effect should clean up after itself.

## Bonus

1. Add a clear-filters action that resets the patient search and gender filter without adding extra derived state.

2. Try `useDeferredValue` for the search value and compare it with the debounce hook. Which behavior feels better for this screen?

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useDeferredValue](https://react.dev/reference/react/useDeferredValue)
