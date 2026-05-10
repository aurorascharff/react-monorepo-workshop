# Module 1: Architecture and Reuse

Work in: `apps/arena` and `packages/ui`.

## Problem

The app works, but too many responsibilities live in the same places. It is hard to see what belongs to the app workflow, what belongs to shared Domain UI, and what should stay as generic Base UI.

## Task

- Extract the patient workflow into named components such as patient list, patient card, patient header, journal list, journal entry, and journal form.
- Put patient and journal components in feature folders so related App UI is easier to find.
- Extract the shared app shell into a layout component.
- Add an error boundary around the page content so the shell can stay visible when content fails.
- Move the shared journal status UI into `packages/ui` as Domain UI.
- Use the shared status UI in both Arena and medix.com.

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
