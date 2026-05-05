# DIPS Workshop

## Tech Stack

- **React 19** with React Compiler enabled
- **React Router v7** (SPA mode, not framework mode)
- **TanStack Query v5** for data fetching and caching
- **React Hook Form + Zod** for forms and validation
- **Tailwind CSS v3** for styling
- **TypeScript** with strict mode
- **Hono** API at `http://localhost:3001`

## Repo Structure

```
apps/arena/     — React Router v7 SPA (journal system — the main workshop app)
apps/api/       — Hono API, pre-written, do not modify
apps/dips.no/   — Next.js marketing site
packages/ui/    — Shared component library, import from here
```

## Code Conventions

- Feature-folder structure: `src/features/patients/`, `src/features/journal/`
- Use `useQuery` / `useSuspenseQuery` for data fetching — never `useEffect` for fetch
- Use `useMutation` + `queryClient.invalidateQueries` after successful mutations
- Validate forms with a Zod schema wired via `zodResolver`
- Wrap `useSuspenseQuery` components in `<ErrorBoundary>`
- Import `StatusBadge` and `JournalStatus` from `@dips/ui`, do not define them locally

## Domain Model

- **Pasient**: `id`, `navn`, `fodselsdato`, `kjonn` (`'mann' | 'kvinne'`), `diagnose`
- **JournalOppforing**: `id`, `pasientId`, `tittel`, `dato`, `innhold`, `status`
- **JournalStatus**: `'aktiv' | 'avsluttet' | 'utkast'` — imported from `@dips/ui`

## API Endpoints

| Method | Path                           | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| GET    | `/patients`                    | List all patients                 |
| GET    | `/patients/:id`                | Get a single patient              |
| GET    | `/journals/pasient/:pasientId` | Get journal entries for a patient |
| POST   | `/journals/pasient/:pasientId` | Create a new journal entry        |
| PATCH  | `/journals/:id/status`         | Update journal entry status       |

## Workshop Context

Participants are .NET/C# developers with a WPF/MVVM background learning React. Keep solutions simple and pedagogical. Useful analogies: components ≈ views, state ≈ viewmodel, props ≈ data binding.

For React best practices and patterns, use the `/react-best-practices` skill.
