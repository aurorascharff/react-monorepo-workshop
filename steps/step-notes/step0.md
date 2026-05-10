# Setup: Starter Run-Through

## Setup frame

- Use the workshop-specific participant repo link, not the private starter template.
- Open `README.md` and use only the setup commands first.
- After everyone has the app running, come back to the README for commands, testing, AI, and CI.
- The setup is part of the workshop, not a race.

## App: Run the monorepo

- Open `README.md`.
- Run `npm install`, `npm run db:seed`, and `npm run dev`.
- Open Arena on `localhost:5173`.
- Open the API docs on `localhost:3001`.
- Open medix.com on `localhost:3000`.
- One command starts several workspaces because this is an npm workspace with Turborepo.
- What is useful about running the app, API, and shared package from the same repo?
- Answer to land: one local setup, shared code, one PR across boundaries, and consistent tooling.

## App: Open the starter

- Start with the app running, not the code.
- Show Dashboard, Patients, one patient detail page, journal entries, status select, and the new journal form.
- The starter is supposed to work. The point is not to fix a broken app from zero. The point is to improve code that looks like a lot of real project code.
- What parts of this app do you expect to get messy as it grows?
- Answer to land: navigation, forms, shared UI, fetching, and state.

## App: Read the README after setup

- Point out the local URLs.
- Point out the main commands.
- Point out the testing commands.
- Point out the AI section.
- Point out the CI section.
- CI checks the same kinds of things we care about locally: linting, types, unit and component tests, build, and end-to-end smoke tests.

## App: Read the code we start from

- Open `apps/arena/src/App.tsx`.
- The local page state.
- This works, but the URL has no idea what screen we are looking at. That is why routing gets its own module.
- The layout code in the same file.
- The shell and the page content are mixed together. That is one of the first things we will separate.
- Open `apps/arena/src/PatientPage.tsx`.
- Scroll slowly. Do not fix anything yet.
- This file has patient list, patient detail, journals, form, status styling, fetching, and mutation logic.
- If you had to change only the status colors, where would you look?
- Answer to land: right now you have to hunt through app code. After Module 1, status styling should live in `packages/ui`.
- If you had to change only the form validation, where would you look?
- Answer to land: right now it is mixed into the form submit handler. After Module 5, the validation rules should live in a schema near the form.
- Let them feel that the file has too many reasons to change.

## App: Show API and shared UI

- Open `apps/api/src/routes`.
- The API is pre-written. We can read it, but we are not spending the day building backend endpoints.
- Open `apps/api/src/db/schema.ts` if the data model needs context.
- Open `packages/ui/src/base`.
- Primitives: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`.
- Open `packages/ui/src/index.ts`.
- Apps should import public UI from here, not deep internal paths.
- When should something move into `packages/ui`?
- Answer to land: when more than one app needs the same concept, or when a shared concept should have one implementation.

## App: Map rendering strategy to the repo

- Connect the earlier rendering strategy discussion to the folders they have now seen.
- `apps/arena` is a client-rendered SPA. It is good for the workshop target because routing, state, effects, data fetching, forms, and client-side behavior are visible.
- `apps/api` is the server boundary. It owns the data and validation.
- `apps/medix.com` is the comparison point for framework routing and server-oriented rendering.
- The point is not that one rendering strategy is always better. The point is to choose based on user experience, SEO, data needs, interactivity, caching, and team complexity.

## App: Tests and AI setup

- Run `npm test` once so participants see the test setup.
- Explain that we are not writing tests during the live modules.
- Open `AGENTS.md` briefly.
- GitHub Copilot and `/react-best-practices`.
- AI setup is useful for scoped context, but we still need to understand the shape of the code.
