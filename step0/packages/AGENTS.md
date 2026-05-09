# Packages — Agent Instructions

## Purpose

`packages/` contains reusable libraries shared across apps. Today this is just `ui/`, but more packages may be added (`types/`, `config/`, etc.).

## Rules

1. Keep packages small, intentional, and reusable.
2. Do not move app-specific business workflows into `packages/` just to avoid imports. Domain-specific wrappers like `<StatusBadge>` are fine; full feature flows are not.
3. Public surface is exposed through each package's `src/index.ts`. Consumers must not deep-import internals.
4. If a shared API changes, validate every consuming app.

## Package Intent

- `ui/` (`@medix/ui`) — shared design system
  - `src/base/` — generic shadcn primitives (`Badge`, `Button`, `Card`, `Input`, `Label`, `Select`, `Textarea`)
  - `src/StatusBadge.tsx`, `src/types.ts`, etc. — domain wrappers and shared types built on top of `base/`
  - Two-layer pattern: apps consume domain wrappers; wrappers consume primitives. One mapping change updates every app.
