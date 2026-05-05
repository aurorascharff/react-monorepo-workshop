# Klinikk Workshop — Agent Instructions

> **Always read the nearest `AGENTS.md` before editing.**  
> Prefer retrieval-led reasoning over pre-training-led reasoning.

A modern React monorepo workshop. The codebase is a fictional healthcare journal system ("Klinikk") used to teach client-side React best practices — but the patterns (monorepo, shared UI, TanStack Query, RHF + Zod, error/suspense boundaries) are domain-agnostic and reusable for any web workshop.

## Workflow

1. Read this file for repo-wide guidance, then defer to the nearest nested `AGENTS.md`.
2. Stay inside the correct boundary:
   - `apps/arena/` — React Router v7 SPA (the workshop app)
   - `apps/api/` — Hono API, pre-written, do not modify
   - `apps/klinikk.no/` — Next.js marketing site
   - `packages/ui/` — shared component library
3. Do not duplicate UI, types, or domain logic across apps — move shared code to `packages/`.
4. Workshop materials: [plan.md](plan.md) (how the day runs), [tasks.md](tasks.md) (module goals).

## Monorepo Shape

```
apps/
  arena/         Vite + React 19 SPA (workshop target)
  api/           Hono + Drizzle + SQLite (pre-written)
  klinikk.no/    Next.js public marketing site
packages/
  ui/            Shared design system (`@klinikk/ui`)
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

A fictional EHR ("electronic health record") used purely as a teaching domain.

- **Pasient**: `id`, `navn`, `fodselsdato`, `kjonn` (`'mann' | 'kvinne'`), `diagnose`
- **JournalOppforing**: `id`, `pasientId`, `tittel`, `dato`, `innhold`, `status`
- **JournalStatus**: `'aktiv' | 'avsluttet' | 'utkast'` — imported from `@klinikk/ui`

Norwegian field names are intentional (the workshop is run in Norwegian); the patterns themselves are language-agnostic.

## Workshop Context

Participants are typically .NET/C# developers with a WPF/MVVM background learning React. Keep solutions simple and pedagogical. Useful analogies: components ≈ views, state ≈ viewmodel, props ≈ data binding.

For React best practices and patterns, use the `/react-best-practices` skill.

## Directory Ownership

- [apps/AGENTS.md](apps/AGENTS.md) — multi-app boundaries
- [apps/arena/AGENTS.md](apps/arena/AGENTS.md) — SPA implementation
- [apps/api/AGENTS.md](apps/api/AGENTS.md) — Hono API (read-only for workshop)
- [apps/klinikk.no/AGENTS.md](apps/klinikk.no/AGENTS.md) — Next.js marketing
- [packages/AGENTS.md](packages/AGENTS.md) — shared packages
- [.github/AGENTS.md](.github/AGENTS.md) — CI/CD workflows and Copilot config
