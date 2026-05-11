# Step 1: Architecture and Reuse

## Frame what we are solving

- Say: the problem is not that the files are too long. The problem is that too many responsibilities are hidden in the same places.
- Ask: if someone changes status styling, layout, or the journal form later, where should they expect to look?
- Land this: structure should make responsibilities easier to find, change, and share.
- Show Exercise One in [`exercises/exercise-1-architecture-and-reuse.md`](../../exercises/exercise-1-architecture-and-reuse.md).

## Participant work (roughly 10-12 minutes)

- Ask participants to work in `apps/arena`, `apps/medix.com`, and `packages/ui`.
- Listen for where they put components, how small they make components, what they decide to share, and whether the error boundary wraps the right part of the UI.

## Group discussion (roughly 5 minutes)

- Focus on what groups tried, where they got stuck, and which structure choices came up more than once.
- Land this point: shared packages are for concepts reused across apps. Feature components stay close to the feature until reuse is real.
- Ask before live coding: what did you decide to keep local, and what did you decide was shared?

## App: Extract the shell

- Open `apps/arena/src/App.tsx`.
- The easiest first move is the app shell: sidebar, mobile header, and page wrapper.
- Move sidebar, mobile header, and page wrapper into `layouts/Layout.tsx`.
- Keep local `page` state in `App.tsx`.
- This is still not proper routing. We are only separating the app shell from the page content.
- Why start with the shell before feature components?
- Answer to land: the shell is a clear boundary and does not require us to decide patient or journal responsibilities yet.
- In the routing module, this same content slot becomes the route outlet.

## App: Split the patient and journal UI

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
- Feature folders: group by what the app does. A patient feature can have components, hooks, and API helpers when those concepts belong to the feature.
- Feature slicing is not one fixed folder rule. In Arena, feature folders make sense because the app has product areas like patients and journals. In a file-based router, route-local components can also live beside the route, like `apps/medix.com/app/products/_components`, while app-wide medix.com components live in `apps/medix.com/app/components`.
- Move patient list UI into `PatientList.tsx`.
- Move one patient row into `PatientCard.tsx`.
- Move selected patient header into `PatientHeader.tsx`.
- A component should have a name that matches a real concept in the UI. If the name feels fake, the split is probably fake too.
- Move one journal entry into `JournalEntry.tsx`.
- Move journal list rendering into `JournalList.tsx`.
- Move the journal form into `JournalForm.tsx`.
- Keep fetching and form logic unchanged in this module.

## App: Add an error boundary

- Create `components`.
- Create `components/ErrorBoundary.tsx`.
- Use [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary), not a custom class boundary.
- Wrap the main content area in `ErrorBoundary`.
- Temporarily add `throw new Error('Test boundary')` inside the page content, verify that only the content fallback renders, then remove it.
- Use the existing `logError` helper for the real render error.
- Show friendly fallback copy. Do not print the internal error message in the UI.
- Where should an error boundary go if we want the sidebar to stay visible?
- Answer to land: the boundary should wrap the part that can fail, not necessarily the whole app.
- This first boundary is a catch-all around the page content. React describes [error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) as a way to show fallback UI for render failures.
- More specific boundaries can live closer to the thing that may fail.

## App: Convert native selects to Base UI

- Open the patient filter and journal entry status control.
- The starter uses native `<select>` controls. They work, but they do not match the design system interaction or styling.
- Replace the gender filter with the shared `Select` primitive from `@medix/ui`.
- Replace the journal status control with the shared `Select` primitive from `@medix/ui`.
- Add `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, and `SelectItem` where they make the control clearer.
- Base UI primitives are generic. They should not know about patients or journals, but they can give app code accessible, consistent controls.
- Keep the actual status presentation in `JournalEntry`, because the status only has meaning in that journal workflow right now.
- Use the selected status value in the control. Do not add a separate badge with the same text.
- Why should we not move this into `packages/ui` just because it repeats a little?
- Answer to land: shared code needs ownership and real reuse. A product workflow detail can stay local until another app has the same concept and the same behavior.
- What should live in `packages/ui`, and what should stay in the app?
- Answer to land: shared primitives and real shared product concepts belong in `packages/ui`; feature-specific screens, workflows, and local presentation stay in the app.
- What should not go into `packages/ui` yet?
- Answer to land: feature-specific code should stay in the feature until reuse is real.

## App: Extract a real shared domain component

- Open the Arena layout and the medix.com layout.
- Both apps render the Medix identity: icon, name, and sometimes product context.
- Create `packages/ui/src/BrandMark.tsx`.
- Export `BrandMark` from `packages/ui/src/index.ts`.
- Use it in `apps/arena/src/layouts/Layout.tsx` as `Medix Arena`.
- Use it in `apps/medix.com/app/layout.tsx` as the main Medix brand.
- This is Domain UI because it knows the product brand. It is not Base UI like `Button`, `Card`, or `Select`.
- Why is this better shared than the journal status control?
- Answer to land: both apps genuinely need the same brand identity, while journal status is currently part of one journal workflow.
- Relate it to Pulse: base components define reusable visual behavior, while domain components can encode shared product concepts.

## Check and module close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
