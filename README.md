# Hands-on React Application Architecture

In this workshop, we will explore how to build and improve the architecture of a React app inside a monorepo. Learn how to structure app features, add routing with React Router, handle client and server state, fetch and update API data with TanStack Query, and create robust forms with React Hook Form and Zod.

Designed for developers who know the basics of React and want more practice with real application structure, this workshop provides practical skills for building maintainable React applications that can grow across apps and shared packages.

## Getting started

**Requirements:** Node.js v20.19+ (CI runs on v22 — `nvm`/`fnm` users get this automatically via the bundled `.nvmrc`).

Use the participant repo link shared by the instructor. If you want to restart from scratch, the starter is available at [github.com/aurorascharff/react-monorepo-workshop-starter](https://github.com/aurorascharff/react-monorepo-workshop-starter).

```bash
git clone <participant-repo-url>
cd <participant-repo-name>
```

Open the `.code-workspace` file in VS Code so the repo settings and recommended extensions are applied.

```bash
npm install
npm run db:seed
npm run dev
```

`npm run dev` starts all apps at once via Turborepo.

| App         | URL                   |
| ----------- | --------------------- |
| Arena (SPA) | http://localhost:5173 |
| API + docs  | http://localhost:3001 |
| medix.com   | http://localhost:3000 |

Workshop tasks are listed in [exercises/](exercises/). Step snapshots are in
[steps/](steps), and this repository is the final reference repo with the
completed app and tests. The final app also includes selected bonus/reference
improvements beyond the main step 5 path.

## Monorepo structure

- [`apps/arena/`](apps/arena/README.md) - React Router v7 SPA for clinical journal workflows
- [`apps/api/`](apps/api/README.md) - Hono REST API, OpenAPI docs, SQLite seed data
- [`apps/medix.com/`](apps/medix.com/README.md) - Next.js public marketing site
- [`apps/e2e/`](apps/e2e/README.md) - Playwright browser tests for Arena and the API
- [`packages/ui/`](packages/ui/README.md) - Shared design system package (`@medix/ui`)

## Tech stack

| Layer         | Tool                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| UI framework  | [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)                                 |
| Routing       | [React Router v7](https://reactrouter.com) (SPA mode)                                                                    |
| Data fetching | [TanStack Query v5](https://tanstack.com/query)                                                                          |
| Forms         | [React Hook Form](https://react-hook-form.com) + [Zod v4](https://zod.dev)                                               |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) + shadcn-style component library                                              |
| API           | [Hono](https://hono.dev) + [Drizzle ORM](https://orm.drizzle.team) + SQLite (pre-written)                                |
| Monorepo      | [Turborepo](https://turbo.build) + npm workspaces                                                                        |
| Testing       | [Vitest](https://vitest.dev), [React Testing Library](https://testing-library.com), [Playwright](https://playwright.dev) |

## Commands

```bash
npm run dev           # Start all apps
npm run build         # Build all apps
npm run lint          # ESLint across all apps
npm run typecheck     # TypeScript check across all apps
npm run format        # Prettier write
npm run format:check  # Prettier check
npm run test          # Vitest across all apps
npm run e2e           # Playwright tests for Arena + API
npm run test:all      # Vitest + Playwright
npm run db:seed       # Reset database to seed data
```

## Testing

This repo includes the full test suite. Vitest and React Testing Library cover unit and component behavior. Playwright covers browser flows against the real API.

```bash
npm run test  # Unit and component tests
npm run e2e   # Browser tests for Arena + API
```

Unit and component tests live in nearby `tests/` folders. Browser tests live in `apps/e2e/tests`. The first `npm run e2e` downloads the Chromium binary Playwright needs (~150 MB); subsequent runs reuse it.

## AI

Includes nested `AGENTS.md` files that scope context to each boundary. Read the nearest `AGENTS.md` before editing.

GitHub Copilot is configured via [.github/copilot-instructions.md](.github/copilot-instructions.md), and the [`vercel-react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) skill is available as `/react-best-practices` in Copilot Chat.

## CI

GitHub Actions runs `lint`, `typecheck`, `test`, `build`, and `e2e` on every push and pull request to `main`.

## Reference

Finished reference repo:
[react-monorepo-workshop](https://github.com/aurorascharff/react-monorepo-workshop)
