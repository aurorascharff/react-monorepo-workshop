# Apps — Agent Instructions

## Purpose

`apps/` contains deployable applications. Each app owns its runtime, routing, and user experience.

## Rules

1. Read the app-local `AGENTS.md` before editing inside `arena/`, `api/`, or `medix.com/`.
2. Do not duplicate shared UI, types, or domain logic across apps — move them to `packages/`.
3. Do not couple `arena/` and `medix.com/` directly. They share via `packages/ui` and via the API.
4. Treat `api/` as the system of record. Frontends do not invent parallel business rules.
5. Prefer app-local lint / typecheck / test runs before workspace-wide ones.

## App Boundaries

- `arena/` — authenticated workflow SPA (clinical journal app)
- `medix.com/` — public marketing site, SEO-oriented, no patient data
- `api/` — pre-written REST API serving both, exposes Scalar docs at `/`
