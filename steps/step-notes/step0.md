# Setup: Starter Run-Through

## Setup

- Use the workshop-specific participant repo link, not the private starter template.
- Open [`README.md`](../../README.md) in Markdown Preview with `Cmd+Shift+V`.
- Mention that exercises are Markdown files too, so they should use preview mode later.
- Open the repo through the `.code-workspace` file before coding.
- Before installing dependencies, briefly mention supply-chain hygiene: use the committed lockfile, check exact package names, and do not run broad commands like `npm audit fix --force` without understanding the change.
- Link the current TanStack/Mini Shai-Hulud incident as context: [Socket write-up](https://socket.dev/blog/tanstack-npm-packages-compromised-mini-shai-hulud-supply-chain-attack), [Socket live incident tracker](https://socket.dev/supply-chain-attacks/mini-shai-hulud), and [TanStack issue #7383](https://github.com/TanStack/router/issues/7383).
- Run `npm install`, `npm run db:seed`, and `npm run dev`.
- Open Arena on [localhost:5173](http://localhost:5173), API docs on [localhost:3001](http://localhost:3001), and medix.com on [localhost:3000](http://localhost:3000).
- One command starts several workspaces because this is an [npm workspace](https://docs.npmjs.com/cli/v11/using-npm/workspaces) with [Turborepo](https://turbo.build/repo/docs).
- Question: what do we get from running the app, API, and shared package from one repo?
- Answer: one setup, shared code, one PR across boundaries, and consistent tooling.

## README Tour

- After the app runs, return to the README.
- Point out local URLs, commands, testing, AI, and CI.
- CI checks the same things we care about locally: linting, types, tests, build, and e2e smoke tests.

## App Tour

- Show Dashboard, Patients, one patient detail page, journal entries, status select, and the journal form.
- Question: what parts do you expect to get messy as this grows?
- Answer: navigation, forms, shared UI, fetching, and state.

## Starter Code

- Open `apps/arena/src/App.tsx`.
- Point out local page state, mixed layout, and page content.
- Say: the URL has no idea what screen we are on. That is why routing gets its own module.
- Open `apps/arena/src/PatientPage.tsx`.
- Point out patient list, detail, journals, form, status styling, fetching, and mutation logic in one place.
- Question: if you only had to change status colors, where would you look?
- Answer: right now you have to hunt through a large page.
- Question: if you only had to change form validation, where would you look?
- Answer: right now it is mixed into submit handling.

## Boundaries

- Open `apps/api/src/routes` and `apps/api/src/db/schema.ts` if they need domain context.
- Say: the API is pre-written. We are not spending the workshop building backend endpoints.
- Open `packages/ui/src/base` and `packages/ui/src/index.ts`.
- Mention primitives: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`.
- Apps should import public UI from `packages/ui/src/index.ts`, not deep internal paths.
- Question: when should something move into `packages/ui`?
- Answer: when more than one app needs the same concept, or when a shared concept should have one implementation.

## Rendering Map

- Connect the earlier rendering strategy discussion to the repo:
  - `apps/arena`: client-rendered SPA for interactive product workflows.
  - `apps/api`: server boundary for data and validation.
  - `apps/medix.com`: framework routing and server-oriented rendering comparison.
- Say: we choose rendering strategy based on UX, SEO, data needs, interactivity, caching, and team complexity.

## Tests and AI

- Run `npm test` once so participants see the setup.
- Say: we are not writing tests during the live modules.
- Open [`AGENTS.md`](../../AGENTS.md) briefly.
- Mention GitHub Copilot and [`/react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices).
