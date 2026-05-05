# Klinikk Arena — React Monorepo Workshop

A full-stack monorepo workshop teaching modern client-side React patterns. The codebase is a fictional healthcare journal system ("Klinikk"), but the patterns — monorepo layout, shared UI, TanStack Query, RHF + Zod, error and suspense boundaries — are domain-agnostic and reusable for any web workshop.

## Stack

- [React 19](https://react.dev) + [React Router v7](https://reactrouter.com) (SPA)
- [TanStack Query v5](https://tanstack.com/query) — data fetching and caching
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — forms and validation
- [Hono](https://hono.dev) + [Drizzle ORM](https://orm.drizzle.team) + SQLite — API and database
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Turborepo](https://turbo.build) — monorepo

## Structure

```
apps/
  arena/        — React Router v7 SPA (the workshop target)
  api/          — Hono REST API (pre-written, OpenAPI + Scalar docs)
  klinikk.no/   — Next.js public marketing site
packages/
  ui/           — Shared design system (`@klinikk/ui`)
```

## Getting started

**Requirements:** Node.js v20+

```bash
git clone https://github.com/aurorascharff/klinikk-workshop.git
cd klinikk-workshop
npm install
npm run db:seed
npm run dev
```

`npm run dev` starts **all three apps at once** via Turborepo — no need to run them separately.

| App         | URL                   |
| ----------- | --------------------- |
| Arena (SPA) | http://localhost:5173 |
| API + docs  | http://localhost:3001 |
| klinikk.no  | http://localhost:3000 |

## Commands

```bash
npm run dev           # Start all apps
npm run build         # Build all apps
npm run lint          # ESLint across all apps
npm run typecheck     # TypeScript check across all apps
npm run format        # Prettier write
npm run format:check  # Prettier check
npm run test          # Vitest across all apps
npm run db:seed       # Reset database to seed data
```

## AI

Includes nested `AGENTS.md` files (root + `apps/`, `apps/arena/`, `apps/api/`, `apps/klinikk.no/`, `packages/`) that scope context to each boundary. Read the nearest `AGENTS.md` before editing.

GitHub Copilot is configured via `.github/copilot-instructions.md`, and the [`vercel-react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) skill is available as `/react-best-practices` in Copilot Chat.

## CI

GitHub Actions runs `lint`, `typecheck`, `test`, and `build` on every push and pull request to `main`. The workflow lives at [.github/workflows/ci.yml](.github/workflows/ci.yml) and mirrors the local commands — anything that passes locally will pass in CI.

```bash
npm ci
npm run db:seed
npm run lint
npm run typecheck
npm run test
npm run build
```

Manual runs are available from the Actions tab (`workflow_dispatch`) or via `gh workflow run ci.yml`.

## Workshop materials

- [plan.md](plan.md) — day-of agenda, theory, demos
- [tasks.md](tasks.md) — module goals and acceptance criteria
