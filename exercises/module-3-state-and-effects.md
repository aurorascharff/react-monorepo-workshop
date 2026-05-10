# Module 3: State and Effects

Work in: `apps/arena`.

## Problem

Some values are stored in state even though they can be calculated from props, route params, or other state. That creates extra synchronization work and makes the UI easier to get out of sync.

## Task

- Find duplicated state in the dashboard, patient detail page, and patient list.
- Remove state that duplicates information already available from props, route params, or other state.
- Calculate derived values during render.
- Keep the patient filtering interaction working.
- Move reusable filtering logic out of the component if that makes the code easier to follow.

## Check

- Values that can be calculated are not stored in state.
- Filtering still behaves the same.
- Data fetching still works as before.
- React hook linting does not report new warnings.

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
