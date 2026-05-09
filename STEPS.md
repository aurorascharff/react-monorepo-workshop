# Workshop Steps

This is the instructor run sheet for the workshop. Use it for the rhythm of the day: slides, task, discussion, walkthrough.

The stable overview, schedule, repositories, and module reference live in [`WORKSHOP.md`](WORKSHOP.md).

The code walkthroughs live outside the runnable snapshots so the app folders stay easy to scan:

- `step-notes/step0.md`
- `step-notes/step1.md`
- `step-notes/step2.md`
- `step-notes/step3.md`
- `step-notes/step4.md`
- `step-notes/step5.md`

Those files are the step-specific live-coding notes. Keep the whole-day flow, timing, and transitions here.

## Format

- Slides first. Keep this short and practical.
- Give them the task. Point to the module goals in `WORKSHOP.md`, the TODOs in the code, and the app behavior they should end with.
- Let them work. Walk around, listen for the same confusion in more than one group.
- Discuss before coding the solution: what they tried, what was unclear, and what tradeoffs they noticed.
- Walk through the solution from the matching `step-notes/stepN.md`.
- After the walkthrough, give them a minute to catch up before moving on.

Ask questions often. Let the room answer before you explain. If they give a good answer, use their wording when you summarize.

## Day at a Glance

| Time | Session |
| --- | --- |
| 09:00 | Intro: Thinking in web |
| 09:30 | Setup |
| 10:15 | Module 1: Architecture and Reuse |
| 11:15 | Module 2: Routing and Next.js comparison |
| 12:00 | Lunch |
| 13:00 | Module 3: State and Effects |
| 13:45 | Module 4: TanStack Query |
| 14:30 | Break |
| 14:45 | Module 5: Forms |
| 15:40 | Wrap-up |

## Before the Workshop

- Participants should clone the starter repo before the day if possible.
- Starter repo: https://github.com/aurorascharff/react-monorepo-workshop-starter
- Keep the authoring repo open as reference.
- Authoring repo: https://github.com/aurorascharff/react-monorepo-workshop
- Have the slides open. Add slide links here when they exist.
- Have `steps/` open in the editor so you can jump to the finished code for each module.
- Run `npm install`, `npm run db:seed`, and `npm run dev` once before people arrive.
- Keep one terminal ready for checks: `npm run typecheck`, `npm run test`, and `npm run lint`.

## 09:00 Slides: Intro

Slides: TODO add link.

- Start with what real React app work usually contains: routing, forms, APIs, loading states, shared UI, tests, and multiple apps that evolve together.
- Keep the intro domain-light. The app is just a useful setting for realistic data and workflows.
- We are not starting from a blank folder. We are improving a working app, because that is closer to normal project work.
- Show the five workshop steps: app structure, routing, state, data fetching, forms.
- CSR, SSR, hydration, latency, loading states, and race conditions as the problems we will keep coming back to.
- Next.js and Server Components briefly as context, then bring it back to today's path: SPA and client-side app structure.
- Where do React codebases usually get hard to follow?
- The answers I want to draw out: folder structure, too much state, effects, forms, duplicated fetching, and inconsistent UI.
- The goal is not to memorize one folder structure. The goal is to recognize what kind of problem we are solving.

## 09:30 Show: Setup the Repository

- Open `README.md`.
- Walk through `npm install`, `npm run db:seed`, and `npm run dev`.
- Open Arena at `localhost:5173`.
- Open the API docs at `localhost:3001`.
- Open medix.com at `localhost:3000`.
- Show root `package.json` and `workspaces`.
- Monorepo briefly: one repo, multiple apps and packages, shared scripts.
- Show `turbo.json` only if it helps. Explain task graph quickly, then move on.
- Show ESLint and Prettier config only enough to make sure the editor is behaving.
- TypeScript strict mode. What feels familiar from C# or another typed language?
- React Compiler. The useful message is that we do not start by adding `useMemo` and `useCallback` everywhere.
- Vitest and React Testing Library. Tests are there as reference and checks, not the main exercise today.
- E2E tests in `apps/e2e` only as a real-world monorepo shape.
- GitHub Copilot, nested `AGENTS.md`, and `/react-best-practices`.
- What do we gain by keeping the app, API, and UI package in one repo?
- The answers I want to draw out: shared types, shared UI, easier local development, one PR across boundaries, and consistent tooling.

## Show: Starter Code

- Open `apps/arena/src/App.tsx`.
- Navigation lives in local state. This works, but the URL does not know what screen we are on.
- Open `apps/arena/src/PatientPage.tsx`.
- Show that this is the main file we will improve. It has patient list, patient detail, journal list, form, status styling, fetching, and mutation logic.
- This is intentional. A starter should work, but still make the problems visible.
- Open `packages/ui/src/base`.
- Show that primitives already exist. We will build on them instead of copying styles.
- Show `packages/ui/src/index.ts`. This is what the apps import from.
- Open `apps/api/src/routes`.
- The API is pre-written. We read it when needed, but this is a frontend workshop.
- Open `apps/api/src/db/schema.ts` if you need to show the small data model.
- The starter only has tests for code that already exists, so it does not reveal future structure.

## 10:15 TASK: Module 1, Architecture and Reuse

Slides: TODO add link.

- The app works, but too many ideas live in the same files. This module is about making the existing concepts visible in the code.
- Component extraction is not about making files tiny. It is about naming responsibilities.
- Feature folders group code by what the app does, not only by file type.
- One broken area should not take down the whole shell, so we place an error boundary around the part that can fail.
- Base primitives are generic. Domain components can know app concepts.
- Shared visual rules are a bit like a `ResourceDictionary` or `Style`: one place changes the behavior everywhere.
- Accessibility is a good reason to build on proven primitives instead of writing every low-level component from scratch.
- The Module 1 goal is in `WORKSHOP.md`. The task is to work through the TODOs in `apps/arena` and `packages/ui`.
- The decisions I care about during the task are where to put components, how small components should be, and why `StatusBadge` belongs in `packages/ui`.

## Discuss: Module 1

- What did you split out first?
- Which component was hardest to name?
- What should live in `packages/ui`, and what should stay in the app?
- Shared packages are for concepts that are reused across apps. Feature components stay close to the feature until there is a real reason to move them.

## Walkthrough: Module 1

- Use `step-notes/step1.md`.
- Keep the walkthrough focused on the code changes.
- After coding `StatusBadge`, change one visual detail and show that both apps pick it up.
- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.

## 11:15 TASK: Module 2, Routing

Slides: TODO add link.

- The screen changes, but the URL does not.
- Show refresh and back button behavior in the starter.
- The URL is app state users can see, copy, bookmark, and send to someone else.
- React Router v7 in SPA mode. Keep the Next.js comparison short for now.
- Nested routes let the shell stay mounted while the child page changes.
- What should happen while a route is loading? We will solve that properly in Module 4, but it is worth noticing now.
- The Module 2 goal is in `WORKSHOP.md`. The task is to add routes, route-level pages, `Layout`, `Outlet`, `Link`, `NavLink`, and `useParams`.
- The decisions I care about during the task are links versus buttons, nested routes, and route params.

## Discuss: Module 2

- What changed when the URL became the source of truth?
- What is the difference between `Link` and a button?
- Why does `Layout` render an `Outlet` instead of receiving a page prop?
- The route tree gives structure to the app. The layout stays mounted while the active child route changes.

## Walkthrough: Module 2

- Use `step-notes/step2.md`.
- After the React Router walkthrough, open `apps/medix.com/app`.
- Show that Next.js uses file-based routing, but the mental model is still URL maps to UI.
- Keep the comparison practical: SPA routing for this app, framework routing for public content and server-rendered pages.
- Run `npm run typecheck --workspace=apps/arena`.

## 12:00 Lunch

- Stop even if the previous module got a little messy.
- Use the break to reset the demo app with `npm run db:seed` if needed.

## 13:00 TASK: Module 3, State and Effects

Slides: TODO add link.

- Some state is remembered even though it can be calculated.
- Derived state is data we can calculate from props or existing state during render. It usually should not be stored.
- `useEffect` is not bad. It is for synchronizing with something outside React.
- `useRef` is another escape hatch for mutable values that should not trigger render, or for direct DOM access.
- Data-fetching effects stay for now. Module 4 handles those.
- The Module 3 goal is in `WORKSHOP.md`. The task is to remove synced state, derive values during render, and extract `usePatientFilter`.
- The questions I want people asking during the task are: "Should this be state?", "Do we need `useMemo`?", and "Is this a good useEffect?"

## Discuss: Module 3

- Which state did you delete?
- When is `useEffect` actually the right tool?
- Did removing state make anything easier to reason about?
- Less state means fewer impossible states. Effects are for external systems, not for keeping React values in sync with each other.

## Walkthrough: Module 3

- Use `step-notes/step3.md`.
- Be clear when you leave a data-fetching effect in place.
- When adding `useDebounce`, explain why the timer makes this a real effect.
- Run `npm test --workspace=apps/arena -- --run`.

## 13:45 TASK: Module 4, TanStack Query

Slides: TODO add link.

- Server state needs loading, error handling, caching, retries, refetching, and mutation updates.
- Server state means the API owns the data and the client displays and changes it.
- Bring back the intro problems: latency, loading states, race conditions, and stale data.
- Show `QueryClientProvider`.
- Query keys are cache addresses.
- The Module 4 goal is in `WORKSHOP.md`. The task is to replace manual fetching with `useQuery`, use `useSuspenseQuery` for detail, and use `useMutation` for journal changes.
- The decisions I care about during the task are query key shape, where loading UI belongs, and what to invalidate after a mutation.

## Discuss: Module 4

- What code disappeared when you moved fetching to TanStack Query?
- What should go in a query key?
- What should happen after a mutation succeeds?
- Query keys define identity. Mutations change server state. Invalidation tells the cache what needs to be refreshed.

## Walkthrough: Module 4

- Use `step-notes/step4.md`.
- Show cache reuse by navigating away and back.
- Show the local Suspense and ErrorBoundary around patient detail.
- Show mutation invalidation after changing journal status or creating a journal.
- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.

## 14:30 Break

- Give people a real pause before forms.
- Reset the database if the journal data is messy.

## 14:45 TASK: Module 5, Forms

Slides: TODO add link.

- The form works, but validation rules are scattered and the error UX is too vague.
- Controlled inputs mean React owns the value. Uncontrolled inputs mean the DOM owns the value and the form library reads it when needed.
- Schema validation gives the form rules one place to live.
- Client validation is for UX. Server validation is still required.
- The Module 5 goal is in `WORKSHOP.md`. The task is to wire React Hook Form, add a Zod schema, show field errors, disable invalid submit, and surface server errors.
- The decisions I care about during the task are `register` versus `Controller`, where errors come from, and how server errors differ from field errors.

## Discuss: Module 5

- What is easier to change once validation lives in a schema?
- When do we use `Controller` instead of `register`?
- What errors can still happen after client validation passes?
- React Hook Form owns form state, Zod owns validation rules, TanStack Query owns the submit mutation, and the API still validates on the server.

## Walkthrough: Module 5

- Use `step-notes/step5.md`.
- Show invalid fields before submit.
- Show a valid submit and the updated journal list.
- Show where a server error would be rendered.
- Run `npm test --workspace=apps/arena -- --run`.

## 15:40 Slides: Wrap-Up

Slides: TODO add link.

- Recap the path: structure, routing, minimal state, server state, forms.
- What is left for future learning: deeper TypeScript, testing, Context, Zustand, security, and server-side React.
- Which pattern will you use first in your own codebase?
- What still feels unclear?
- Leave time for questions and cleanup.
- The starter repo and authoring repo for later reference.
