# Step 1: Architecture and Reuse

## Introduce task in repo

- Problem: the app works, but too many responsibilities live in the same files.
- Concepts: feature folders, component responsibility, shared UI, and error boundaries.
- Rule of thumb: extract when a name captures a real responsibility.
- Outcome: focused components, `Layout`, `ErrorBoundary`, and shared `StatusBadge`.
- Show Module 1 in `exercises/module-1-architecture-and-reuse.md`.
- Frame the exercise as an outcome: they choose the structure, then we compare choices.

## Participant work (roughly 10-12 minutes)

- Ask participants to work in `apps/arena` and `packages/ui`.
- Listen for where they put components, how small they make components, whether `StatusBadge` belongs in the app or shared package, and whether the error boundary wraps the right part of the UI.

## Group discussion (roughly 5 minutes)

- Focus on what groups tried, where they got stuck, and which structure choices came up more than once.
- Land this point: shared packages are for concepts reused across apps. Feature components stay close to the feature until reuse is real.

## App: Split the monolith

- Open `apps/arena/src/PatientPage.tsx`.
- Before we move code, we need names for the things that already exist on the screen.
- What components can you see in the UI before looking at the code?
- Answer to land: Patient list, patient card, patient header, journal list, journal entry, form.
- What did you split out first when you tried this yourself?
- Answer to land: list/card/header are usually easier first moves than form or data fetching.
- Which component was hardest to name?
- Answer to land: if a name feels fake, the boundary may be fake or the component may still have too many responsibilities.
- Create `features/patients/components`.
- Create `features/journal/components`.
- Create `components`.
- Create `layouts`.
- Feature folders: group by what the app does. A patient feature can have components, hooks, and API helpers when those concepts belong to the feature.
- Move patient list UI into `PatientList.tsx`.
- Move one patient row into `PatientCard.tsx`.
- Move selected patient header into `PatientHeader.tsx`.
- A component should have a name that matches a real concept in the UI. If the name feels fake, the split is probably fake too.
- Move one journal entry into `JournalEntry.tsx`.
- Move journal list rendering into `JournalList.tsx`.
- Move the journal form into `JournalForm.tsx`.
- Keep fetching and form logic unchanged in this module.

## App: Extract layout and boundary

- Move sidebar, mobile header, and page wrapper from `App.tsx` into `layouts/Layout.tsx`.
- Keep local `page` state in `App.tsx`.
- This is still not proper routing. We are only separating the app shell from the page content.
- Create `components/ErrorBoundary.tsx`.
- Wrap the main content area in `ErrorBoundary`.
- Where should an error boundary go if we want the sidebar to stay visible?
- Answer to land: the boundary should wrap the part that can fail, not necessarily the whole app.
- This first boundary is a catch-all around the page content. More specific boundaries can live closer to the thing that may fail.

## App: Build shared StatusBadge

- Open `packages/ui/src/base/badge.tsx`.
- This is a primitive. It does not know anything about journals or statuses.
- Create `packages/ui/src/StatusBadge.tsx`.
- Move `JournalStatus` into `@medix/ui`.
- Add status config for `active`, `closed`, and `draft`.
- Render `Badge` inside `StatusBadge`.
- Export `StatusBadge` and `JournalStatus` from `packages/ui/src/index.ts`.
- Why is the mapping from status to color not just a className in the app?
- Answer to land: it is a shared domain concept, so it should have one home.
- What should live in `packages/ui`, and what should stay in the app?
- Answer to land: shared primitives and shared domain UI belong in `packages/ui`; feature-specific screens and workflows stay in the app.
- The layering: base primitives at the bottom, domain-specific UI on top, apps consuming the shared component.

## App: Use StatusBadge

- Replace inline status styling in `JournalEntry`.
- Use `StatusBadge` in `apps/medix.com/app/page.tsx`.
- Use `StatusBadge` in `apps/medix.com/app/products/page.tsx`.
- Change one status style and verify that both apps update from one place.
- What should not go into `packages/ui` yet?
- Answer to land: feature-specific code should stay in the feature until reuse is real.

## Check and module close

- Run `npm run typecheck --workspace=apps/arena`.
- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
