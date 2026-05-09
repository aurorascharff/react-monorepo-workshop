# Workshop Reference

This file holds the stable workshop information: format, schedule, repositories, authoring materials, and module overview.

Use [`STEPS.md`](STEPS.md) for the instructor run sheet. Use [`steps/`](steps/) for complete code snapshots.

## Workshop

**Title:** Real World React: Monorepos, APIs, and App Structure

**Duration:** One day, 09:00 to 16:00

**Audience:** Developers who know programming fundamentals and want a practical React workflow for larger apps.

**Format:** Short slides, individual coding, group discussion, instructor walkthrough.

## Teaching Format

Each module follows the same loop:

1. Slides introduce the concept and the problem in the starter code.
2. Participants work through the task in the app.
3. The group discusses what they tried and where they got stuck.
4. The instructor live-codes the solution using the matching `step-notes/stepN.md`.
5. Everyone gets a moment to catch up before the next module.

Keep the workshop conversational. Ask the room what they notice before explaining the answer.

## Schedule

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

## Repositories

- Starter repo: https://github.com/aurorascharff/react-monorepo-workshop-starter
- Authoring repo: https://github.com/aurorascharff/react-monorepo-workshop

Participants should clone the starter repo. The authoring repo contains the finished app, instructor notes, and step snapshots.

## Authoring Materials

- [`STEPS.md`](STEPS.md) - instructor run sheet for slides, tasks, discussion, and walkthroughs
- [`step-notes`](step-notes) - per-step live-coding notes
- [`steps/README.md`](steps/README.md) - complete code snapshots for each workshop module
- [`steps/step0`](steps/step0) - starter snapshot used for the participant repo

## Module Overview

| Module | Focus | Main outcome |
| --- | --- | --- |
| 1 | Architecture and Reuse | Split large files, create focused components, add shared `StatusBadge`, add an error boundary |
| 2 | Routing | Make the URL the source of truth with React Router routes, links, params, and nested layout |
| 3 | State and Effects | Remove unnecessary state, derive values during render, extract reusable hook logic |
| 4 | TanStack Query | Replace manual fetching with queries, suspense queries, mutations, cache invalidation, and local boundaries |
| 5 | Forms | Add React Hook Form and Zod validation with field errors, disabled invalid submit, and server error feedback |

## Module Goals

### Module 1: Architecture and Reuse

The goal is to make the codebase readable and reusable.

- Files are organized by what the app does, not by file type
- Each component has a single responsibility
- Domain logic, like status to color, lives in the component library instead of being scattered across apps
- An error in one part of the page does not crash the whole app

### Module 2: Routing

The goal is to make the URL the source of truth for what the user sees.

- Each page has its own URL and can be bookmarked
- Navigation happens without a full page reload
- Shared UI like header and sidebar is shared across pages without duplication
- The active page is visually clear in the navigation

### Module 3: State and Effects

The goal is to keep state minimal and derived where possible.

- Anything computable is computed, not stored
- No `useEffect` synchronizes state with other state
- Logic used in multiple places is extracted into a hook
- ESLint reports no `react-hooks` warnings

### Module 4: TanStack Query

The goal is to handle data declaratively by describing what data we want, not how to fetch it by hand in every component.

- No `useEffect` is used for data fetching
- Loading and error states are visible to the user
- The cache is reused across navigation
- Mutations update relevant queries automatically
- Suspense-driven queries surface failures through a contextual error boundary so the surrounding shell stays visible

### Module 5: Forms

The goal is to stop invalid data before it leaves the form.

- Validation is defined in a Zod schema, not scattered across the component
- Error messages appear per field
- Submit is disabled while the form is invalid or submitting
- A successful submit updates the UI without a manual refresh
- Server errors are surfaced to the user in a meaningful way

## Setup Notes

- Ask participants to clone the starter repo before the workshop if possible.
- Shared WiFi can be slow, so keep the first setup section calm.
- Run `npm install`, `npm run db:seed`, and `npm run dev` together.
- Confirm Arena at `localhost:5173`.
- Confirm API docs at `localhost:3001`.
- Confirm medix.com at `localhost:3000`.
- Show `npm test` briefly, but do not make testing the main path through the day.
- Mention nested `AGENTS.md` files only as a context and boundary aid.

## Slide Links

- Intro: TODO
- Module 1: TODO
- Module 2: TODO
- Module 3: TODO
- Module 4: TODO
- Module 5: TODO
- Wrap-up: TODO
