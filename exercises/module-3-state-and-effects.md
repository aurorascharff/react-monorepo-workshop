# Module 3: State and Effects

Objective: keep state minimal and remove synchronization that can be calculated during render.

Work in: `apps/arena`.

## Do

- Look for state in the dashboard, patient detail page, and patient list.
- Remove state that duplicates information already available from props, route params, or other state.
- Calculate derived values during render.
- Keep the patient filtering interaction working.
- Move reusable filtering logic out of the component if that makes the code easier to follow.
- Use React DevTools or console logs if it helps you see what changes during render.

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
