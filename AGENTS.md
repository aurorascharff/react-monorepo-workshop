# Medix — Agent Instructions

> **Always read the nearest `AGENTS.md` before editing.**  
> Prefer retrieval-led reasoning over pre-training-led reasoning.

Medix is a healthcare journal platform: a clinician-facing SPA, a public marketing site, a shared design system, and a REST API — all in one monorepo.

## Workflow

1. Read this file for repo-wide guidance, then defer to the nearest nested `AGENTS.md`.
2. Stay inside the correct boundary:
   - `apps/arena/` — React Router v7 SPA (clinical journal app)
   - `apps/api/` — Hono API
   - `apps/medix.com/` — Next.js marketing site
   - `packages/ui/` — shared component library
3. Do not duplicate UI, types, or domain logic across apps — move shared code to `packages/`.

## Monorepo Shape

```
apps/
  arena/         Vite + React 19 SPA (clinical journal app)
  api/           Hono + Drizzle + SQLite
  medix.com/     Next.js public marketing site
packages/
  ui/            Shared design system (`@medix/ui`)
```

## Tech Stack

- React 19 (with React Compiler)
- React Router v7 (declarative SPA, not framework mode)
- TanStack Query v5
- React Hook Form + Zod
- Tailwind CSS v4
- TypeScript strict
- Turborepo + npm workspaces
- Vitest + React Testing Library

## Domain Model

Medix is an EHR ("electronic health record") platform.

- **Patient**: `id`, `name`, `dateOfBirth`, `gender` (`'male' | 'female'`), `diagnosis`
- **Journal**: `id`, `patientId`, `title`, `date`, `content`, `status`
- **JournalStatus**: `'active' | 'closed' | 'draft'` — owned by `apps/arena`

## Code Style

Keep solutions simple and idiomatic. Prefer small focused components and shared primitives from `@medix/ui` over local re-implementations.

For React best practices and patterns, use the `/react-best-practices` skill.

## Directory Ownership

- [apps/AGENTS.md](apps/AGENTS.md) — multi-app boundaries
- [apps/arena/AGENTS.md](apps/arena/AGENTS.md) — SPA implementation
- [apps/api/AGENTS.md](apps/api/AGENTS.md) — Hono API
- [apps/medix.com/AGENTS.md](apps/medix.com/AGENTS.md) — Next.js marketing
- [packages/AGENTS.md](packages/AGENTS.md) — shared packages
- [.github/AGENTS.md](.github/AGENTS.md) — CI/CD workflows and Copilot config
