# Exercise One: Architecture and Reuse

## Problem

The app works, but too many responsibilities live in the same places. It is hard to see what belongs to the app workflow, what belongs to shared domain UI, and what belongs to generic Base UI.

## Task

1. Extract the sidebar, mobile header, and page wrapper from `App.tsx` into a named layout component. The page content should stay separate from the surrounding chrome.

2. Split the patient and journal UI into named components so the page reads more like a workflow than one large file. Put patient UI with patient code and journal UI with journal code. Keep using existing Base UI primitives from `@medix/ui`; do not move feature code into the shared package.

3. Add a shared `<ErrorBoundary>` (using [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary), already installed) that takes `title`, `message`, and `logContext` props. Use it twice — a layout-level catch-all and a contextual one around the patient detail with copy that names _that_ failure. Verify by throwing inside the patient detail and confirming only that area is replaced. Log via the existing `logError` helper.

4. Replace the native selects in the patient filter and journal status control with the shared Base UI `Select` primitive. Keep the status inside the control instead of adding a separate badge.

5. Find the duplicated Medix logo and wordmark in the Arena shell and the medix.com layout. Turn that UI into a shared `BrandMark` domain component in `packages/ui`. Arena renders `Medix` with the `Arena` product context; medix.com renders the main Medix brand.

## Bonus

1. Try moving the error boundary around before settling on a final placement. Compare what stays visible when something fails, and where the user can recover.

2. Look for one more piece of UI that feels reusable. Before extracting it, compare it with Base UI and `BrandMark`: who would own it, and what kind of change would make it unsafe to share?

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
