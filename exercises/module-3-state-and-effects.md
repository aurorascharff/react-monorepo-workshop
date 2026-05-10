# Module 3: State and Effects

Goal: keep state minimal and remove synchronization that can be calculated during render.

Work in `apps/arena`.

## Exercise

Look for state in the dashboard, patient detail page, and patient list that duplicates information already available from props, route params, or other state. Remove the duplicated state and calculate those values during render instead.

The patient filtering interaction should stay readable and reusable enough that the component is not carrying all of the filtering logic itself.

## Check Your Work

- Values that can be calculated are not stored in state.
- Filtering still behaves the same.
- Data fetching still works as before.
- React hook linting does not report new warnings.

## Resources

- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
