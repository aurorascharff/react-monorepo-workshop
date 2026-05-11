# Step 1: Architecture and Reuse

## Before They Work

- Say: the problem is not that the files are long. The problem is that responsibilities are hidden.
- Question: if someone changes status styling, layout, or the journal form later, where should they look?
- Answer: structure should make responsibilities easier to find, change, and share.
- Show Exercise One in [`exercises/exercise-1-architecture-and-reuse.md`](../../exercises/exercise-1-architecture-and-reuse.md).

## Participant Work

- Work time: roughly 10-12 minutes.
- Discussion: roughly 5 minutes.
- Listen for component boundaries, shared versus local UI, and where the error boundary belongs.
- Question before live coding: what did you keep local, and what did you decide was shared?

## Extract the Shell

- Open `apps/arena/src/App.tsx`.
- Move sidebar, mobile header, and page wrapper into `layouts/Layout.tsx`.
- Keep local `page` state in `App.tsx`.
- Keep the existing inline brand markup for now. `BrandMark` comes later.
- Say: this is not routing yet. We are only separating shell from page content.
- Question: why start with the shell before feature components?
- Answer: the shell is a clear boundary and avoids patient/journal decisions at first.
- Mention: in the routing module, this content slot becomes the route outlet.

## Split Patient and Journal UI

- Open `apps/arena/src/PatientPage.tsx`.
- Question: what components can you see in the UI before looking at the code?
- Answer: patient list, patient card, patient header, journal list, journal entry, form.
- Question: which component was hardest to name?
- Answer: if the name feels fake, the boundary may be fake.
- Create `features/patients/components` and `features/journal/components`.
- Move patient list into `PatientList.tsx`, one row into `PatientCard.tsx`, and selected patient header into `PatientHeader.tsx`.
- Move one journal entry into `JournalEntry.tsx`, the list into `JournalList.tsx`, and the form into `JournalForm.tsx`.
- Keep fetching and form logic unchanged.
- Keep the selects native for now. We convert them in the next substep.
- Say: feature folders group by what the app does. Route-local folders, like `apps/medix.com/app/products/_components`, are also valid when code belongs to one route.

## Add an Error Boundary

- Create `components/ErrorBoundary.tsx`.
- Use [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary).
- Wrap the main content area.
- Temporarily throw `new Error('Test boundary')` inside the page content, verify the shell stays visible, then remove it.
- Log the real error with `logError`, but show friendly fallback copy.
- Question: where should the boundary go if the sidebar should stay visible?
- Answer: around the part that can fail, not the whole app.
- Link if useful: React docs on [error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

## Convert Native Selects to Base UI

- Open the patient filter and journal entry status control.
- Replace native `<select>` controls with the shared `Select` primitive from `@medix/ui`.
- Use `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectLabel`, and `SelectItem` where useful.
- Say: Base UI is generic. It should not know about patients or journals.
- Keep status presentation in `JournalEntry`; it only has meaning in this workflow right now.
- Question: what should live in `packages/ui`, and what should stay in the app?
- Answer: shared primitives and real shared product concepts belong in `packages/ui`; feature-specific screens and workflow UI stay in the app.

## Extract BrandMark

- Open the Arena layout and medix.com layout.
- Create `packages/ui/src/BrandMark.tsx` and export it.
- Use it in `apps/arena/src/layouts/Layout.tsx` as `Medix Arena`.
- Use it in `apps/medix.com/app/layout.tsx` as the main Medix brand.
- Say: this is Domain UI. It knows the product brand. It is not Base UI like `Button`, `Card`, or `Select`.
- Question: why is this better shared than journal status?
- Answer: both apps need the same brand identity, while journal status is still one app workflow.
- Relate to Pulse: base components define reusable behavior; domain components encode shared product concepts.

## Close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
