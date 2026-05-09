# Workshop Run Sheet

Use this file during the workshop. It tells you what mode you are in, what to show, what to say, what task to give, and when to switch to the code walkthrough.

Use [`WORKSHOP.md`](WORKSHOP.md) for the stable schedule and module goals. Use [`INSTRUCTOR.md`](INSTRUCTOR.md) for screen setup and room reminders. Use [`step-notes`](step-notes) only when you are live coding the solution.

Participant tasks live in [`EXERCISES.md`](EXERCISES.md), not in code comments. For each task, show the matching module in that file and the starting code it refers to.

## Mode Key

| Mode         | What happens                                                     |
| ------------ | ---------------------------------------------------------------- |
| `SLIDES`     | Explain the concept with slides.                                 |
| `SHOW APP`   | Switch to browser or VS Code to show the current problem.        |
| `TASK`       | Participants work. You walk around.                              |
| `DISCUSS`    | Facilitate a group discussion about what they tried and noticed. |
| `CODE`       | Live-code the solution using `step-notes/stepN.md`.              |
| `CHECKPOINT` | Run checks, commit, push, and give the recovery instruction.     |
| `BREAK`      | Stop and reset.                                                  |

## Module Flow

Each module follows the same loop:

1. Explain the problem with slides.
2. Show the starting code and the matching module in `EXERCISES.md`.
3. Let participants try the task.
4. Facilitate a group discussion about what they tried, what was unclear, and which tradeoffs came up.
5. Live-code your solution while they watch and answer questions.
6. Run checks, commit, and push.
7. Tell them how to switch to your solution if they prefer it.

At the end of each module, say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 09:00 Intro

### SLIDES

Slides: TODO add link.

Slide should include:

- Workshop title and the practical promise: improve a real React app, not start from scratch.
- The five steps: app structure, routing, state and effects, data fetching, forms.
- The main problems the day keeps returning to: too much responsibility in one place, URL state, unnecessary state, async data, validation.
- A note that the codebase is intentionally imperfect because real code usually is.

Say:

Today is not about learning every React API. It is about recognizing the problems that show up in larger React apps: routing, forms, APIs, loading states, shared UI, state, tests, and multiple apps that evolve together.

We are not starting from a blank folder. We are improving a working app, because that is closer to real project work.

Show the five steps:

1. App structure and shared UI
2. Routing
3. State and effects
4. Data fetching
5. Forms

Ask:

Where do React codebases usually get hard to follow?

Listen for:

- folder structure
- too much state
- effects
- forms
- duplicated fetching
- inconsistent UI

### SLIDES

Slides: TODO add audience check slide link.

Slide should include:

- Who is in the room?
- What kind of work do you do?
- How much React have you used?
- What are you hoping to get out of today?
- Small group: quick round, one person at a time.
- Large group: raise-of-hands questions.

Small group flow:

Ask each person:

1. What is your name?
2. What do you work on?
3. How much React have you used?
4. What would make today useful for you?

Large group flow:

Ask for hands:

1. Who mostly works frontend?
2. Who mostly works backend?
3. Who works full stack?
4. Who has used React in production?
5. Who has only tried React a little?
6. Who is here because their team is moving toward React?

Say:

I ask this because the examples are the same, but the way I explain them can change based on what is familiar in the room.

## 09:30 Setup

### SLIDES

Slides: TODO add setup slide link.

Slide should include:

- Starter repo URL.
- Commands: `npm install`, `npm run db:seed`, `npm run dev`.
- Local URLs: Arena `5173`, API docs `3001`, medix.com `3000`.
- What to open if something fails: README, terminal, API docs.
- Reminder that setup is part of the workshop, not a race.

Say:

Before we change code, we need to make sure everyone can run the same app locally.

### SHOW APP

Use [`step-notes/step0.md`](step-notes/step0.md).

Show:

- `README.md`
- `EXERCISES.md`
- `package.json`
- `apps/arena/src/App.tsx`
- `apps/arena/src/PatientPage.tsx`
- `packages/ui/src/base`
- `packages/ui/src/index.ts`
- `apps/api/src/routes`
- `AGENTS.md`

Run together:

```bash
npm install
npm run db:seed
npm run dev
```

Confirm:

- Arena: `http://localhost:5173`
- API docs: `http://localhost:3001`
- medix.com: `http://localhost:3000`

Say:

The starter works. The point today is not to fix a broken app from zero. The point is to improve code that looks like real project code after it has grown for a while.

Ask:

What parts of this app do you expect to get messy as it grows?

Listen for:

- navigation
- forms
- shared UI
- fetching
- state

## 10:15 Module 1: Architecture And Reuse

### SLIDES

Slides: TODO add Module 1 slide link.

Slide should include:

- Module title: Architecture and Reuse.
- Problem: the app works, but too many responsibilities live in the same files.
- Concepts: feature folders, component responsibility, shared UI, error boundaries.
- Rule of thumb: extract to name a responsibility, not to make files tiny.
- Task outcome: focused components, `Layout`, `ErrorBoundary`, shared `StatusBadge`.

Say:

The app works, but too many ideas live in the same files. This module is not about making files tiny. It is about naming responsibilities.

Feature folders group code by what the app does. Shared UI belongs in a package when more than one app needs the same concept. Error boundaries let one broken area fail without taking down the whole shell.

### SHOW APP

Open:

- `apps/arena/src/App.tsx`
- `apps/arena/src/PatientPage.tsx`
- `packages/ui/src/base/badge.tsx`
- `apps/medix.com/app/page.tsx`
- `apps/medix.com/app/products/page.tsx`

Show Module 1 in `EXERCISES.md`.

Say:

Look at the patient page before touching it. We can already see separate ideas: patient list, selected patient header, journal list, journal entries, and the form. The first job is to name those ideas in code.

### TASK

Time: 25 minutes.

Task prompt:

Work through Module 1 in `EXERCISES.md`.

1. Split the large patient page into focused components.
2. Move the app shell into a layout.
3. Add an error boundary around the main content.
4. Create `StatusBadge` in `packages/ui`.
5. Export `StatusBadge` and `JournalStatus` from `packages/ui`.
6. Use `StatusBadge` in Arena and medix.com.

While they work, listen for:

- where they put components
- how small they make components
- whether `StatusBadge` belongs in the app or shared package
- whether the error boundary wraps the right part of the UI

### DISCUSS

Facilitate a group discussion. Do not go person by person. Collect patterns from the room.

Focus on what groups tried, where they got stuck, and which structure choices came up more than once.

Land:

Shared packages are for concepts reused across apps. Feature components stay close to the feature until reuse is real.

### CODE

Use [`step-notes/step1.md`](step-notes/step1.md).

Walkthrough order:

1. Split the monolith.
2. Extract layout and boundary.
3. Build shared `StatusBadge`.
4. Use `StatusBadge`.

### CHECKPOINT

Run:

```bash
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```

Commit and push the module.

Say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 11:15 Module 2: Routing

### SLIDES

Slides: TODO add Module 2 slide link.

Slide should include:

- Module title: Routing.
- Problem: the screen changes, but the URL does not.
- Concepts: `BrowserRouter`, routes, nested layout, `Outlet`, `Link`, `NavLink`, `useParams`.
- User impact: refresh, back button, bookmarks, sharing.
- Task outcome: real URLs for dashboard, patient list, and patient detail.

Say:

The screen changes, but the URL does not. That means refresh, back button, bookmarks, and sharing do not behave like users expect.

The URL is app state that users can see, copy, bookmark, and send to someone else.

### SHOW APP

Open the app and show:

- changing screens with local state
- refresh behavior
- back button behavior
- missing patient detail URL

Open:

- `apps/arena/src/App.tsx`
- layout/navigation files created in Module 1
- `apps/arena/src/PatientPage.tsx`

Show Module 2 in `EXERCISES.md`.

### TASK

Time: 15 minutes.

Task prompt:

Work through Module 2 in `EXERCISES.md`.

1. Wrap the app in `BrowserRouter`.
2. Create route definitions for dashboard, patients, and patient detail.
3. Use `Layout` and `Outlet` for the shared shell.
4. Replace local-state navigation with `Link` and `NavLink`.
5. Create route-level pages.
6. Link each patient to `/patients/:id`.
7. Read the patient id with `useParams`.

While they work, listen for:

- links versus buttons
- nested routes
- where `Outlet` belongs
- how route params flow into page code

### DISCUSS

Facilitate a group discussion. Do not go person by person. Collect patterns from the room.

Focus on what changed when people moved from local state to routes, and which routing concepts felt unclear.

Land:

The route tree gives structure to the app. The layout stays mounted while the active child route changes.

### CODE

Use [`step-notes/step2.md`](step-notes/step2.md).

Walkthrough order:

1. Show the navigation problem.
2. Add `BrowserRouter`.
3. Create routes.
4. Update layout navigation.
5. Create pages.
6. Link to details.
7. Read route params.
8. Compare with Next.js.

After the React Router walkthrough, open `apps/medix.com/app` and show file-based routing briefly.

### CHECKPOINT

Run:

```bash
npm run typecheck --workspace=apps/arena
```

Commit and push the module.

Say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 12:00 Lunch

### BREAK

Stop even if Module 2 got messy.

During the break:

- reset data with `npm run db:seed` if needed
- open Module 3 files
- check [`step-notes/step3.md`](step-notes/step3.md)

## 13:00 Module 3: State And Effects

### SLIDES

Slides: TODO add Module 3 slide link.

Slide should include:

- Module title: State and Effects.
- Problem: the app stores values it can calculate.
- Concepts: derived state, minimal state, `useEffect` as synchronization, `useRef` as an escape hatch.
- Rule of thumb: if it can be calculated during render, do not store it.
- Task outcome: remove synced state and extract `usePatientFilter`.

Say:

Some state is remembered even though it can be calculated. That creates extra moving parts and impossible states.

Derived state is data we can calculate from props or existing state during render. It usually should not be stored.

`useEffect` is not bad. It is for synchronizing with something outside React.

### SHOW APP

Open:

- `apps/arena/src/Dashboard.tsx`
- `apps/arena/src/PatientPage.tsx`

Show Module 3 in `EXERCISES.md`.

Say:

Leave data-fetching effects alone for now. Module 4 handles those. This module is about state that only exists because other React state changed.

### TASK

Time: 15 minutes.

Task prompt:

Work through Module 3 in `EXERCISES.md`.

1. Remove dashboard state that can be derived during render.
2. Remove selected patient state that only syncs with selected id.
3. Extract patient search and filter logic into `usePatientFilter`.
4. Keep data-fetching effects for Module 4.

While they work, listen for:

- "Should this be state?"
- "Do we need `useMemo`?"
- "Is this a good `useEffect`?"
- confusion between derived state and external synchronization

### DISCUSS

Facilitate a group discussion. Do not go person by person. Collect patterns from the room.

Focus on which state people removed, which effects felt suspicious, and where the line between derived state and synchronization was unclear.

Land:

Less state means fewer impossible states. Effects are for external systems, not for keeping React values in sync with each other.

### CODE

Use [`step-notes/step3.md`](step-notes/step3.md).

Walkthrough order:

1. Frame the problem.
2. Remove derived dashboard state.
3. Remove selected patient sync.
4. Extract `usePatientFilter`.
5. Add `useDebounce`.
6. Add tests.

### CHECKPOINT

Run:

```bash
npm test --workspace=apps/arena -- --run
```

Commit and push the module.

Say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 13:45 Module 4: TanStack Query

### SLIDES

Slides: TODO add Module 4 slide link.

Slide should include:

- Module title: TanStack Query.
- Problem: manual fetching repeats loading, error, race, and cache logic.
- Concepts: server state, query keys, loading states, errors, suspense queries, mutations, invalidation.
- Rule of thumb: query keys describe identity; invalidation describes what changed.
- Task outcome: replace manual fetch effects with queries and mutations.

Say:

Server state needs loading, error handling, caching, retries, refetching, and mutation updates.

Server state means the API owns the data and the client displays and changes it. TanStack Query gives us a standard way to describe that data instead of building the same async infrastructure in every component.

### SHOW APP

Open:

- `apps/arena/src/main.tsx`
- files with manual `fetch` and `useEffect`
- patient list
- patient detail
- journal status update
- journal creation flow

Show Module 4 in `EXERCISES.md`.

### TASK

Time: 20 minutes.

Task prompt:

Work through Module 4 in `EXERCISES.md`.

1. Replace manual patient list fetching with `useQuery`.
2. Add loading and error UI for the list.
3. Replace patient detail fetching with `useSuspenseQuery`.
4. Wrap patient detail loading in local `Suspense` and local `ErrorBoundary`.
5. Replace journal fetching with a query.
6. Update journal status with `useMutation`.
7. Invalidate the relevant queries after a successful mutation.
8. Submit the journal form through a mutation.

While they work, listen for:

- query key shape
- where loading UI belongs
- where the local error boundary belongs
- what to invalidate after a mutation
- whether they over-invalidate

### DISCUSS

Facilitate a group discussion. Do not go person by person. Collect patterns from the room.

Focus on what code disappeared, what people chose for query keys, and what they invalidated after mutations.

Land:

Query keys define identity. Mutations change server state. Invalidation tells the cache what needs to be refreshed.

### CODE

Use [`step-notes/step4.md`](step-notes/step4.md).

Walkthrough order:

1. Show manual server state.
2. Check `QueryClientProvider`.
3. Create `usePatients`.
4. Use `usePatients`.
5. Fetch patient detail with `useSuspenseQuery`.
6. Add local `Suspense` and `ErrorBoundary`.
7. Create `useJournals`.
8. Update journal status with `useMutation`.
9. Submit journal form through mutation.

### CHECKPOINT

Run:

```bash
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```

Commit and push the module.

Say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 14:30 Break

### BREAK

Give people a real pause before forms.

During the break:

- reset data with `npm run db:seed` if journal data is messy
- open Module 5 files
- check [`step-notes/step5.md`](step-notes/step5.md)

## 14:45 Module 5: Forms

### SLIDES

Slides: TODO add Module 5 slide link.

Slide should include:

- Module title: Forms.
- Problem: validation rules are scattered and errors are too vague.
- Concepts: React Hook Form, Zod schema, `zodResolver`, field errors, server errors, mutation submit.
- Rule of thumb: client validation is for UX, server validation is still required.
- Task outcome: schema-backed form with field errors, disabled invalid submit, and server error feedback.

Say:

The form works, but validation rules are scattered and the error UX is too vague.

React Hook Form owns form state. Zod owns validation rules. TanStack Query owns the submit mutation. The API still validates on the server.

Client validation is for UX. Server validation is for trust.

### SHOW APP

Open:

- journal form component
- API route for journal creation if useful
- current form in the browser

Show Module 5 in `EXERCISES.md`.

### TASK

Time: 20 minutes.

Task prompt:

Work through Module 5 in `EXERCISES.md`.

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

While they work, listen for:

- where validation rules live
- `register` versus `Controller`
- field errors versus server errors
- client validation versus server validation

### DISCUSS

Facilitate a group discussion. Do not go person by person. Collect patterns from the room.

Focus on where people put validation rules, how they handled errors, and where `register` versus `Controller` was unclear.

Land:

The schema keeps validation rules in one place. The form library manages form state. The mutation manages the API call. The server remains the final authority.

### CODE

Use [`step-notes/step5.md`](step-notes/step5.md).

Walkthrough order:

1. Show the manual form.
2. Add Zod schema.
3. Infer form type.
4. Wire React Hook Form.
5. Register text fields.
6. Use `Controller` for `DatePicker`.
7. Submit with `handleSubmit` and mutation.
8. Disable invalid submit and show errors.
9. Add tests.

### CHECKPOINT

Run:

```bash
npm test --workspace=apps/arena -- --run
```

Commit and push the module.

Say:

If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

## 15:40 Wrap-Up

### SLIDES

Slides: TODO add wrap-up slide link.

Slide should include:

- Recap of the path: structure, routing, state, server state, forms.
- What each pattern solved.
- Reference links: starter repo, authoring repo, and `steps/` snapshots.
- Further learning: deeper TypeScript, testing, Context, Zustand, security, server-side React.
- Certification information and next steps.
- Final discussion prompt: what will you use first?

Say:

Today we moved through the main problems that show up in larger React apps: structure, routing, state, server state, and forms.

Close with a short reflection and Q&A:

- Which pattern will you use first in your own codebase?
- What still feels unclear?
- Which part changed how you think about React?

### CHECKPOINT

Make sure the last module is committed and pushed if participants need the reference.
