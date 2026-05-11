# Module 1: Architecture and Reuse

Work in: `apps/arena`, `apps/medix.com`, and `packages/ui`.

## Problem

The app works, but too many responsibilities live in the same places. It is hard to see what belongs to the app workflow, what should be shared, and what should stay as generic Base UI.

## Task

1. Start in `apps/arena/src/PatientPage.tsx`. Split the patient and journal UI into named components so the page reads more like a workflow than one large file. Keep the current fetching and form behavior working.

2. Organize the extracted components by feature. Patient UI should live with patient code, journal UI should live with journal code, and generic Base UI should stay in `packages/ui/src/base`.

3. Move the shared app shell out of `App.tsx`. Add an error boundary with `react-error-boundary` around the page content so the fallback replaces the failed content, not the whole shell. Show friendly fallback copy to the user and log the real error with the existing [`logError` helper](../apps/arena/src/lib/logger.ts).

4. Replace the native selects in the patient filter and journal status control with the shared Base UI `Select` primitive from `@medix/ui`. Keep the status visible without adding a separate badge.

5. Create a shared `BrandMark` domain component in `packages/ui` and use it from both Arena and medix.com.

## Bonus

1. Try a different error boundary placement and compare what stays visible when the page content fails.

2. In medix.com, extract a component that should stay local to that app. Compare why `BrandMark` belongs in `packages/ui`, while this component does not.

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
