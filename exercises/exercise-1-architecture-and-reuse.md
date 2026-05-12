# Exercise One: Architecture and Reuse

## Problem

The app works, but too many responsibilities live in the same places. It is hard to see what belongs to the app workflow, what belongs to shared domain UI, and what belongs to generic Base UI.

## Task

1. Move the shared app shell out of [apps/arena/src/App.tsx](../apps/arena/src/App.tsx) so the sidebar, mobile header, and page wrapper live in a named layout.

2. Start in [apps/arena/src/PatientPage.tsx](../apps/arena/src/PatientPage.tsx). Split the patient and journal UI into named components so the page reads more like a workflow than one large file. Put patient UI with patient code and journal UI with journal code. Keep using existing Base UI primitives from `@medix/ui`; do not move feature code into [packages/ui/src/base](../packages/ui/src/base).

3. Add an error boundary with `react-error-boundary` (already installed in `apps/arena`) around the page content so the fallback replaces the failed content, not the whole shell. To verify it, temporarily throw a render error inside the page content, confirm the shell stays visible, then remove the throw. Show friendly fallback copy to the user and log the real error with the existing [`logError` helper](../apps/arena/src/lib/logger.ts).

4. Replace the native selects in the patient filter and journal status control with the shared Base UI [`Select`](../packages/ui/src/base/select.tsx) primitive from `@medix/ui`. Keep the status inside the control instead of adding a separate badge.

5. Find the duplicated Medix logo and wordmark in the Arena shell and the medix.com layout in [apps/medix.com/app/layout.tsx](../apps/medix.com/app/layout.tsx). Turn that UI into a shared `BrandMark` domain component in [packages/ui](../packages/ui/src). Arena renders `Medix` with the `Arena` product context; medix.com renders the main Medix brand.

## Bonus

1. Try moving the error boundary around before settling on a final placement. Compare what stays visible when something fails, and where the user can recover.

2. Look for one more piece of UI that feels reusable. Before extracting it, compare it with Base UI and `BrandMark`: who would own it, and what kind of change would make it unsafe to share?

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
