# Workshop Exercises

Use this file during the task sections. The instructor will introduce each module before you start, and then walk through one possible solution afterwards.

The codebase starts from working code. Your job is to improve the structure and behavior step by step.

## Module 1: Architecture And Reuse

Goal: make the codebase easier to read and reuse.

Work in `apps/arena` and `packages/ui`.

1. Split the large patient page into focused components.
2. Move the app shell into a reusable layout.
3. Add an error boundary around the main content area.
4. Create `StatusBadge` in `packages/ui`.
5. Export `StatusBadge` and `JournalStatus` from `packages/ui`.
6. Use `StatusBadge` in both Arena and medix.com.

Check your work:

- The patient list, patient header, journal list, journal entry, and journal form are easier to find.
- The sidebar stays outside the area protected by the error boundary.
- Status styling lives in one shared place.

## Module 2: Routing

Goal: make the URL describe what the user is looking at.

Work in `apps/arena`.

1. Wrap the app in `BrowserRouter`.
2. Create routes for dashboard, patient list, and patient detail.
3. Use `Layout` and `Outlet` for the shared shell.
4. Replace local-state navigation with `Link` and `NavLink`.
5. Create route-level pages.
6. Link each patient to `/patients/:id`.
7. Read the patient id with `useParams`.

Check your work:

- Refresh works on a patient detail page.
- The back button behaves like expected.
- The active navigation item reflects the current route.

## Module 3: State And Effects

Goal: keep state minimal and remove effects that only synchronize React state with other React state.

Work in `apps/arena`.

1. Remove dashboard state that can be derived during render.
2. Remove selected patient state that only syncs with selected id.
3. Extract patient search and filter logic into `usePatientFilter`.
4. Leave data-fetching effects for Module 4.

Check your work:

- Values that can be calculated are not stored in state.
- Filtering still behaves the same.
- Data fetching still works as before.

## Module 4: TanStack Query

Goal: handle server state declaratively.

Work in `apps/arena`.

1. Replace manual patient list fetching with `useQuery`.
2. Add loading and error UI for the list.
3. Replace patient detail fetching with `useSuspenseQuery`.
4. Wrap patient detail loading in local `Suspense` and local `ErrorBoundary`.
5. Replace journal fetching with a query.
6. Update journal status with `useMutation`.
7. Invalidate the relevant queries after a successful mutation.
8. Submit the journal form through a mutation.

Check your work:

- Loading and error states are visible.
- Navigating away and back reuses cached data.
- Changing journal status updates the UI after the mutation succeeds.
- The app shell stays visible if patient detail loading fails.

## Module 5: Forms

Goal: move validation rules into a schema and show useful form errors.

Work in `apps/arena`.

1. Add a Zod schema for a new journal entry.
2. Infer the form type from the schema.
3. Wire the form with React Hook Form.
4. Connect Zod through `zodResolver`.
5. Register text fields.
6. Use `Controller` where the input does not fit simple `register`.
7. Submit through `handleSubmit` and a mutation.
8. Show field-level errors.
9. Disable submit while invalid or submitting.
10. Show server errors in the form.

Check your work:

- Invalid fields show clear messages.
- The submit button is disabled when the form is invalid or submitting.
- A successful submit updates the journal list.
- Server errors are visible to the user.
