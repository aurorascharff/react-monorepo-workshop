# Step 1: Architecture and Reuse


## App: Split the monolith

- Open `apps/arena/src/PatientPage.tsx`.
- Before we move code, we need names for the things that already exist on the screen.
- What components can you see in the UI before looking at the code?
- The answers I want to draw out: Patient list, patient card, patient header, journal list, journal entry, form.
- Create `features/patients/components`.
- Create `features/journal/components`.
- Create `components`.
- Create `layouts`.
- Feature folders: group by what the app does. A patient feature can have components, hooks, and API helpers later.
- Move patient list UI into `PatientList.tsx`.
- Move one patient row into `PatientCard.tsx`.
- Move selected patient header into `PatientHeader.tsx`.
- A component should have a name that matches a real concept in the UI. If the name feels fake, the split is probably fake too.
- Move one journal entry into `JournalEntry.tsx`.
- Move journal list rendering into `JournalList.tsx`.
- Move the journal form into `JournalForm.tsx`.
- Keep the current fetching and form logic for now.
- We are not fixing every smell at once. Each module has one job.

## App: Extract layout and boundary

- Move sidebar, mobile header, and page wrapper from `App.tsx` into `layouts/Layout.tsx`.
- Keep local `page` state in `App.tsx`.
- This is still not proper routing. We are only separating the app shell from the page content.
- Create `components/ErrorBoundary.tsx`.
- Wrap the main content area in `ErrorBoundary`.
- Where should an error boundary go if we want the sidebar to stay visible?
- The answers I want to draw out: The boundary should wrap the part that can fail, not necessarily the whole app.
- This first boundary is a catch-all. In the data fetching module we add a more contextual boundary closer to the loading data.

## App: Build shared StatusBadge

- Open `packages/ui/src/base/badge.tsx`.
- This is a primitive. It does not know anything about journals or statuses.
- Create `packages/ui/src/StatusBadge.tsx`.
- Move `JournalStatus` into `@medix/ui`.
- Add status config for `active`, `closed`, and `draft`.
- Render `Badge` inside `StatusBadge`.
- Export `StatusBadge` and `JournalStatus` from `packages/ui/src/index.ts`.
- Why is the mapping from status to color not just a className in the app?
- The point I want to land: it is a shared domain concept, so it should have one home.
- The layering: base primitives at the bottom, domain-specific UI on top, apps consuming the shared component.

## App: Use StatusBadge

- Replace inline status styling in `JournalEntry`.
- Use `StatusBadge` in `apps/medix.com/app/page.tsx`.
- Use `StatusBadge` in `apps/medix.com/app/products/page.tsx`.
- Change one status style and verify that both apps update from one place.
- This is the payoff. One concept, one implementation.
- What should not go into `packages/ui` yet?
- The point I want to land: Keep feature-specific code in the feature until reuse is real.

## Check

- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.
- If a test fails because an import moved, fix the import rather than changing the behavior.

