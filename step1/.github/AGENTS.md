# GitHub Automation — Agent Instructions

## Purpose

`.github/` owns CI/CD workflows and Copilot configuration.

## Rules

1. Keep CI commands aligned with local commands. If `npm run test` works locally, CI should run the same thing — never invent a separate matrix.
2. Use Turborepo's task graph rather than hand-listing apps. Adding a new app should not require a workflow change.
3. Workflow triggers should match ownership boundaries — don't fan out unnecessary jobs.
4. Keep secrets out of committed workflow files.

## Files

- `workflows/ci.yml` — lint, typecheck, test, build on push and PR
- `copilot-instructions.md` — Copilot entry point, points at the root `AGENTS.md`
