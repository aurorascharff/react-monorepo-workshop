# Workshop Reference

This file holds the stable workshop information: format, schedule, repositories, authoring materials, and module overview.

Use [`exercises/solutions/exercise-N-NAME-steps.md`](exercises/solutions/) for module walkthroughs (rationale, code, and live-coding flow). Use [`steps/`](steps/) for complete code snapshots after each module.

## Workshop

**Title:** Hands-on React Application Architecture

**Duration:** One day, 09:00 to 16:00

**Audience:** Developers who know programming fundamentals and want a practical React workflow for larger apps.

**Format:** Short slides, AI-assisted individual coding, group discussion, instructor walkthrough.

## Teaching Format

Each module follows the same loop:

1. Slides introduce the concept and the problem in the starter code.
2. Participants work through the task in the app.
3. The group discusses what they tried and where they got stuck.
4. The instructor live-codes the solution using the matching `exercises/solutions/exercise-N-NAME-steps.md`.
5. The instructor runs the relevant checks, commits, and pushes the module solution.
6. Participants get a recovery path: they can keep their own work, or discard local changes and run `git pull` to use the pushed solution.
7. Pause before the next module so participants can pull the pushed solution if needed.

At the end of each module, say:

> If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.

Ask the room what they notice before explaining the answer.

The participant tasks live in [`exercises/`](exercises/). Module notes should point there instead of repeating the task steps, so updates only need to happen in one place.

## AI Use

Participants can use AI tools during the task sections. The goal is not to type every line by hand. The goal is to understand the change, review what the tool suggests, run the checks, and be able to explain the result to the group.

Encourage small, scoped prompts that reference the local files and module goal. Participants should still read the generated code, compare it with the existing patterns, and decide what to keep.

During the instructor walkthrough, use GitHub Copilot ghost text where it helps, but narrate the decision-making: what you accept, what you edit, and what you reject.

## Schedule

- 09:00 — Intro
- 09:15 — Background: Rendering strategies and browser behavior
- 09:30 — Setup and repo tour
- 10:15 — Module 1: Architecture and Reuse
- 11:00 — Break
- 11:15 — Module 2: Routing
- 12:00 — Lunch
- 13:00 — Module 3: State and Effects
- 13:45 — Module 4: Server State
- 14:30 — Break
- 14:45 — Module 5: Forms
- 15:40 — Wrap-up

## Repositories

- Private starter template: https://github.com/aurorascharff/react-monorepo-workshop-starter. Do not share this with participants.
- Participant repo: created from the starter template for each workshop.
- Final reference repo: https://github.com/aurorascharff/react-monorepo-workshop

Participants should clone the workshop-specific participant repo, not the private starter template. The final reference repo contains the finished app, completed tests, instructor notes, and step snapshots.

## Authoring Materials

- [`exercises/`](exercises/) - participant tasks and resources
  - `exercise-N-NAME.md` - the task brief
  - [`exercises/solutions/exercise-N-NAME-steps.md`](exercises/solutions/) - the step-by-step walkthrough (rationale + code, used for live-coding and participant fallback)
- [`INSTRUCTOR.md`](INSTRUCTOR.md) - day-of checklist, room notes, fallback plan, and follow-up
- [`steps/`](steps) - complete code snapshots for each workshop module
- [`steps/step0`](steps/step0) - starter snapshot used for the participant repo

## Module Overview

- **Intro: Rendering strategies and browser behavior** — Compare CSR, SSR, static rendering, streaming, and Server Components, then connect those choices to the web platform
- **Setup and repo tour** — Run the app, read the README, inspect the starter structure, connect the rendering model to the repo, and confirm the local tools
- **Module 1: Architecture and Reuse** — Split large files, create focused components, replace native selects with shared Base UI, add a shared `BrandMark`, and add an error boundary
- **Module 2: Routing** — Make the URL the source of truth with React Router routes, links, params, nested layout, and a Next.js rendering comparison
- **Module 3: State and Effects** — Remove unnecessary state, derive values during render, extract reusable hook logic
- **Module 4: Server State** — Replace manual fetching with server-state hooks, cache identity, mutations, invalidation, and local boundaries
- **Module 5: Forms** — Add React Hook Form and Zod validation with field errors, visible submit state, and server error feedback

## Module Goals

### Intro: Welcome and room background

Open with a short welcome and explain that this is a hands-on React application architecture workshop where we improve a working app inside a monorepo.

Before introducing yourself, ask who is in the room:

- Small group: go around and ask what they work on, how much React they have used, and what they want from the day.
- Large group: use raise-of-hands questions for frontend/backend/full-stack, React experience, internal systems/public products, and teams moving toward React.

Then introduce yourself briefly: who you are, what you work with, and why you care about React app architecture.

### Intro: Rendering strategies

The goal is to set the mental model for the rest of the day.

- Rendering strategy is an architecture choice
- Different parts of the same product can use different rendering strategies
- The right choice depends on user experience, SEO, data needs, interactivity, caching, and team complexity

Core ideas to cover:

- **Client-side rendering:** the browser downloads JavaScript, React renders the UI, and the app talks to APIs from the client. This fits app-like authenticated workflows such as Arena.
- **Server-side rendering:** the server sends HTML for the requested URL before React takes over in the browser. This can improve first load, sharing, and SEO for public pages.
- **Static rendering:** HTML is produced ahead of time when content does not need to be personalized per request. This fits many marketing and documentation pages.
- **Hydration:** React attaches event handlers and client behavior to HTML that already came from the server. The user may see HTML before the page is fully interactive.
- **Streaming and Suspense:** the server can send useful parts of the page before every slow data dependency is ready.
- **React Server Components:** some components can run only on the server and send their rendered result to the client. This changes where data access, bundles, and component boundaries live.

### Intro: Browser behavior

The goal is to connect rendering strategy back to the browser.

- React is part of the web platform, not a replacement for it
- URLs, links, forms, navigation history, loading, errors, accessibility, and network requests are part of the architecture
- Browser tools help us understand what the app is actually doing
- React choices should show up in browser behavior: document requests, fetch requests, loading states, form submissions, focus, labels, and recovery from errors

### Setup and repo tour

The goal is to get everyone running the same app and understand the repo before changing code.

- Participants use the workshop-specific participant repo
- The app, API, marketing site, and shared package all run from one monorepo
- The README explains setup, commands, tests, AI context, and CI
- The repo tour connects `apps/arena`, `apps/api`, `apps/medix.com`, and `packages/ui`
- The repo tour connects the rendering strategy discussion to the actual folders
- The starter contains the issues the workshop modules improve

### Module 1: Architecture and Reuse

The goal is to make the codebase readable and reusable.

- Files are organized by what the app does, not by file type
- Each component has a single responsibility
- Shared product UI, like the `BrandMark`, lives in the component library instead of being duplicated across apps
- An error in one part of the page does not crash the whole app

### Module 2: Routing

The goal is to make the URL the source of truth for what the user sees.

- Each page has its own URL and can be bookmarked
- Navigation happens without a full page reload
- Shared UI like header and sidebar is shared across pages without duplication
- The active page is visually clear in the navigation
- The Next.js comparison shows server-rendered or pre-rendered HTML in the Network tab, then compares it with the SPA shell

### Module 3: State and Effects

The goal is to keep state minimal and derived where possible.

- Anything computable is computed, not stored
- No `useEffect` synchronizes state with other state
- Logic used in multiple places is extracted into a hook
- ESLint reports no `react-hooks` warnings

### Module 4: Server State

The goal is to handle data declaratively by describing what data we want, not how to fetch it by hand in every component.

- No `useEffect` is used for data fetching
- Loading and error states are visible to the user
- The cache is reused across navigation
- Mutations update relevant queries automatically
- Server-state errors are shown where the user can recover while the surrounding shell stays visible

### Module 5: Forms

The goal is to stop invalid data before it leaves the form.

- Validation is defined in a Zod schema, not scattered across the component
- Error messages appear per field
- Validation and submit state are visible to the user
- A successful submit updates the UI without a manual refresh
- Server errors are surfaced to the user in a meaningful way

## Wrap-up

Use the closing slides to recap the path through the day and send people toward the right references.

- Recap the path: structure, routing, state, server state, and forms
- Remind people what each pattern solved
- If it is a large room, ask for a raise of hands: who learned something about routing, state, server state, forms, or rendering strategy that they did not know before
- If it is a smaller room, go around and ask each person for one thing they learned that they did not know before
- Ask what they will use first in their own codebase
- Ask what still feels unclear
- Ask which part changed how they think about React
- Include certification information and further learning links
