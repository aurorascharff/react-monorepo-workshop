# Module 1: Architecture and Reuse

Objective: make the app easier to read, change, and reuse across the monorepo.

Work in: `apps/arena` and `packages/ui`.

## Do

- Restructure the main patient workflow so the visible parts of the UI have clear names in the code.
- Use feature folders for this exercise. The point is ownership: make it easier to find where a change belongs.
- Separate the shared app shell from the page content.
- Make sure a content error does not take down the whole shell.
- Look for the journal status UI in the Arena journal entry and the medix.com pages.
- Move that shared Domain UI concept to the UI package so both apps use the same implementation.
- Compare Arena and medix.com in the browser after the shared status UI changes.

## Check

- The patient list, patient header, journal list, journal entry, and journal form are easier to find.
- The sidebar stays visible if the main content area fails.
- Status styling lives in one shared place.
- Arena and medix.com both use the shared status UI.

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
