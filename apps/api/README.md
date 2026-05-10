# API

The API is a Hono REST API for patients and journal entries. It is the server boundary for Arena: data and server-side validation live here.

## Run

```bash
npm run dev --workspace=apps/api
npm run db:seed --workspace=apps/api
npm run typecheck --workspace=apps/api
```

API docs are available at `http://localhost:3001`.

## Structure

```text
src/
  index.ts          - Hono app, CORS, OpenAPI, Scalar docs
  routes/           - patient and journal endpoints
  schemas.ts        - Zod request and response schemas
  db/schema.ts      - Drizzle SQLite schema
  db/seed.ts        - deterministic seed data
```

## Notes

Use the API to understand the data model, inspect requests, reseed data, and confirm that client validation does not replace server validation.
