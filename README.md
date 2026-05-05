# DIPS Arena — React Workshop

A full-stack journal system built with modern React patterns. Used as the codebase for a React best practices workshop at DIPS.

## Stack

- [React 19](https://react.dev) + [React Router v7](https://reactrouter.com) (SPA)
- [TanStack Query v5](https://tanstack.com/query) — data fetching and caching
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — forms and validation
- [Hono](https://hono.dev) + [Drizzle ORM](https://orm.drizzle.team) + SQLite — API and database
- [Tailwind CSS v3](https://tailwindcss.com) — styling
- [Turborepo](https://turbo.build) — monorepo

## Structure

```
apps/
  arena/    — React Router v7 SPA (journal system)
  api/      — Hono REST API
  dips.no/  — Next.js marketing site
packages/
  ui/       — Shared component library
```

## Getting started

**Requirements:** Node.js v20+

```bash
git clone https://github.com/aurorascharff/workshop-dips.git
cd workshop-dips
npm install
npm run db:seed
npm run dev
```

| App | URL |
|---|---|
| Arena | http://localhost:5173 |
| API | http://localhost:3001 |
| dips.no | http://localhost:3000 |

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

Includes GitHub Copilot configuration via `AGENTS.md` and the [`vercel-react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) skill (available as `/react-best-practices` in Copilot Chat).

