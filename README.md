# Hands-on React Monorepos, APIs, and App Structure

In this workshop, we will explore how to build and improve a React app inside a monorepo. Learn how to structure app features, add routing with React Router, handle client and server state, fetch and update API data with TanStack Query, and create robust forms with React Hook Form and Zod.

Designed for developers who know the basics of React and want more practice with real application structure, this workshop provides practical skills for building maintainable React applications that can grow across apps and shared packages.

## Tech stack

| Layer         | Tool                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| UI framework  | [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)  |
| Routing       | [React Router v7](https://reactrouter.com) (SPA mode)                                     |
| Data fetching | [TanStack Query v5](https://tanstack.com/query)                                           |
| Forms         | [React Hook Form](https://react-hook-form.com) + [Zod v4](https://zod.dev)                |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) + shadcn-style component library               |
| API           | [Hono](https://hono.dev) + [Drizzle ORM](https://orm.drizzle.team) + SQLite (pre-written) |
| Monorepo      | [Turborepo](https://turbo.build) + npm workspaces                                         |
| Testing       | [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com)       |

## Monorepo structure

```
apps/
  arena/        - React Router v7 SPA (workshop target)
  api/          - Hono REST API (pre-written, OpenAPI + Scalar docs)
  medix.com/    - Next.js marketing site (reference)
packages/
  ui/           - Shared design system (@medix/ui)
```

## Getting started

**Requirements:** Node.js v20+

```bash
git clone https://github.com/aurorascharff/react-monorepo-workshop-starter.git
cd react-monorepo-workshop-starter
npm install
npm run db:seed
npm run dev
```

`npm run dev` starts all apps at once via Turborepo.

Workshop tasks are listed in [EXERCISES.md](EXERCISES.md).

| App         | URL                   |
| ----------- | --------------------- |
| Arena (SPA) | http://localhost:5173 |
| API + docs  | http://localhost:3001 |
| medix.com   | http://localhost:3000 |

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

Includes nested `AGENTS.md` files (root + `apps/`, `apps/arena/`, `apps/api/`, `apps/medix.com/`, `packages/`) that scope context to each boundary. Read the nearest `AGENTS.md` before editing.

GitHub Copilot is configured via `.github/copilot-instructions.md`, and the [`vercel-react-best-practices`](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) skill is available as `/react-best-practices` in Copilot Chat.

## CI

GitHub Actions runs `lint`, `typecheck`, `test`, and `build` on every push and pull request to `main`.

## Reading & references

If you're new to React, or coming from a strongly typed UI background like WPF/MVVM, these are useful reads for the workshop.

### Foundations

- [Thinking in React](https://react.dev/learn/thinking-in-react) - how to break a UI into components and decide where state lives
- [Describing the UI](https://react.dev/learn/describing-the-ui) - JSX, components, props
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) - how `useState` works, and what it isn't
- [Rules of React](https://react.dev/reference/rules) - purity, idempotency, and why React components aren't classes
