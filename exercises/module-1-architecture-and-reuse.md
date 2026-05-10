# Module 1: Architecture and Reuse

Work in: `apps/arena` and `packages/ui`.

## Problem

The app works, but too many responsibilities live in the same places. It is hard to see what belongs to the app workflow, what belongs to shared Domain UI, and what should stay as generic Base UI.

## Task

1. Start in `apps/arena/src/PatientPage.tsx`. Split the patient and journal UI into named components so the page reads more like a workflow than one large file.

2. Organize the extracted components by feature. Patient UI should live with patient code, and journal UI should live with journal code.

3. Move the shared app shell out of `App.tsx` and add an error boundary around the page content so navigation and layout can stay visible if content fails.

4. Move the journal status display into `packages/ui` as shared Domain UI, then use it from both Arena and medix.com.

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
