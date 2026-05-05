# API App — Agent Instructions

## Purpose

`apps/api` is the Hono REST API. **Pre-written for the workshop — do not modify during exercises.** Participants may read it to understand the contract.

## Structure

- `src/index.ts` — `OpenAPIHono` app, CORS, `/openapi.json`, Scalar docs at `/`
- `src/routes/patients.ts` — patient endpoints (`GET /`, `GET /{id}`)
- `src/routes/journals.ts` — journal endpoints (list / get / create / update status)
- `src/schemas.ts` — shared Zod schemas with `.openapi()` metadata
- `src/db/schema.ts` — Drizzle schema (SQLite tables `patients`, `journals`)
- `src/db/seed.ts` — deterministic seed data; reset via `npm run db:seed`

## Rules

1. Routes are defined with `createRoute({ method, path, request, responses })` and registered with `app.openapi(route, handler)`. New endpoints must follow the same pattern so the OpenAPI spec stays accurate.
2. All request/response shapes go through Zod schemas in `src/schemas.ts`. Do not inline ad-hoc shapes in handlers.
3. Validation messages and OpenAPI text are in **English**. Domain field names (`pasientId`, `tittel`, `fodselsdato`, status enum) stay Norwegian to match the shared domain model.
4. Use `c.req.valid('param' | 'json')` to read validated input. Never read `c.req.raw` directly when a schema exists.
5. Server-side validation is the security boundary; client validation is for UX.

## Endpoints

| Method | Path                            |
| ------ | ------------------------------- |
| GET    | `/patients`                     |
| GET    | `/patients/{id}`                |
| GET    | `/journals/pasient/{pasientId}` |
| POST   | `/journals/pasient/{pasientId}` |
| PATCH  | `/journals/{id}/status`         |

Interactive docs: `http://localhost:3001/`

## Validation

```bash
npm run typecheck --workspace=apps/api
npm run db:seed --workspace=apps/api
```
