# Module 1: Architecture and Reuse

Goal: make the app easier to read, change, and reuse across the monorepo.

Work in `apps/arena` and `packages/ui`.

## Exercise

Restructure the Arena app so the main patient workflow is easier to understand. Start with the patient page and the app shell, then give the visible parts of the UI names in the code. Separate the shared shell from the page content, and make sure a content error does not take down the whole shell.

There is also status styling used in the patient journal and on medix.com. Move that shared concept to the UI package so both apps can use the same implementation.

Use the browser while you work. Compare Arena and medix.com after the shared status UI changes, and use DevTools if you want to inspect where the visible UI changes.

## Check Your Work

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
