# Workshop Plan: Real-World React — Monorepo, APIs, and Best Practice

**Instructor:** Aurora Scharff  
**Duration:** One day, 09:00–16:00  
**Audience:** Up to 40 participants (~8–10 groups of 4–5)  
**Location:** Gullhaug Torg 5, Nydalen

---

## Theme

Most React tutorials show you `useState` and `useEffect` in an isolated component. Real apps look different — many screens, code shared across multiple applications, real APIs, loading and error states that have to be trustworthy in production. This workshop is about that reality.

Participants work inside a realistic Turborepo monorepo containing an SPA, a Next.js marketing site, and a pre-written Hono API. Across five hands-on modules they fix deliberate problems in an existing codebase and learn why patterns like shared component libraries, error boundaries, declarative data fetching, and schema-validated forms belong in any serious React app.

## Format

- The codebase is intentionally "wrong" — participants fix it module by module
- New functionality is live-coded by the instructor
- Slow and conversational — read code together, questions welcome
- Done early? Raise your hand and help others in your group

**Per module:**

```
5 min       — Theory intro (slides)
15–25 min   — Individual coding (TODOs in the codebase)
10 min      — Group discussion
10 min      — Walkthrough / live-code
```

Coding time varies per module — see each module's "Individual coding" heading. Module 1 and Module 5 get longer blocks because they touch more files.

---

## Tech Stack

| Area      | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | React Router v7 (SPA)                                     |
| Backend   | Hono (pre-written, runs locally)                          |
| Database  | SQLite + Drizzle ORM                                      |
| Monorepo  | Turborepo                                                 |
| Styling   | Tailwind CSS + shadcn/ui                                  |
| Data      | TanStack Query                                            |
| Forms     | React Hook Form + Zod                                     |
| Tooling   | ESLint, Prettier, TypeScript                              |
| Testing   | Vitest + React Testing Library (pre-configured)           |
| AI        | GitHub Copilot + `copilot-instructions.md` + agent skills |

**Repo:**

A single repo (`medix-workshop`) with two branches:

- `main` — finished solution (instructor reference)
- `starter` — participant starting point, with deliberate bugs and TODOs per module

Participants who fall behind can `git pull origin main` to fast-forward to the solution.

> The codebase uses fictional names (**Medix**, **Arena**) instead of real product names so the material is reusable as a generic monorepo React workshop.

**Repo structure:**

```
apps/
  arena/        ← React Router v7 SPA (the journal app — workshop target)
  api/          ← Hono API (pre-written, OpenAPI + Scalar docs at /)
  medix.com/    ← Next.js (marketing site — SSR, SEO, static content)
packages/
  ui/           ← shared component library (`@medix/ui`, shadcn base + custom)
```

`turbo dev` starts every app in parallel. The API is pre-written — participants don't need to touch it, but they're free to read it. The SQLite file ships in the repo with seed data (patients, journal entries). The API exposes an interactive docs UI (Scalar) at its root URL, so participants can explore the endpoints visually.

**Domain:** `arena/` is a journal system inspired by Norwegian hospital EHRs — patient list, journal entries, forms. `medix.com/` is a simple marketing site that consumes `packages/ui` and demonstrates why Next.js makes sense for content-heavy public pages (SEO, static generation, SSR). The healthcare framing is teaching context only — the underlying patterns are domain-agnostic.

**Audience background:** Primarily .NET/C# developers with a WPF/MVVM background. Comfortable with object-oriented thinking, data binding, and layered architecture — but limited React and browser-paradigm experience. Use this actively: components ≈ views, state ≈ viewmodel, props ≈ data binding.

---

## Day at a glance

| Time  | Session                                                                    |
| ----- | -------------------------------------------------------------------------- |
| 09:00 | Intro: Thinking in web                                                     |
| 09:30 | Setup                                                                      |
| 10:15 | **Module 1: Architecture & Reuse** — fix structure → build component lib   |
| 11:15 | **Module 2: Routing** + Next.js demo                                       |
| 12:00 | Lunch                                                                      |
| 13:00 | **Module 3: State & Effects**                                              |
| 13:45 | **Module 4: TanStack Query**                                               |
| 14:30 | Break                                                                      |
| 14:45 | **Module 5: Forms**                                                        |
| 15:40 | Wrap-up + certification pitch                                              |

---

## Agenda

### 09:00 — Intro: Thinking in web

_Format: Slides_

- CSR vs SSR, hydration, and performance
- Latency, loading states, and race conditions — we look at the problems _before_ we solve them
- Brief honest overview of Next.js, Server Components, RSC
  - _"We run a separate course on server-side React — today is SPA and client-side best practices"_
- What we're building today

### 09:30 — Setup

_Format: Demo + codealong_

> **Note:** 40 people on shared WiFi — ask them to clone in advance.

**Set up the repo**

- README.md: walk through `npm install`, `npm run db:seed`, `npm run dev` — run together and verify everything is up
- Show the ports: Arena at `localhost:5173`, API at `localhost:3001` (Scalar docs at root), medix.com at `localhost:3000`
- Turborepo: show that all apps start in parallel from one command — explain the monorepo concept briefly (workspaces, shared packages, task graph)
- ESLint and Prettier: show config, show errors highlighted in the editor, show format-on-save — make sure everyone has it working
- TypeScript strict mode: types for props, events, and API responses. Ask: what's familiar from C#? (Interfaces ≈ types, generics, nullable)
- React Compiler: enabled by default — it memoizes automatically, you don't need `useMemo`/`useCallback` manually. Leave it on and trust it.
- Vitest + React Testing Library: pre-configured but not used actively today — it's there and set up correctly
- AI setup: GitHub Copilot enabled, nested `AGENTS.md` files at every boundary, `copilot-instructions.md` points at the root one, `/react-best-practices` skill available as a slash command in chat

**Walk through the repo structure**

- `apps/arena/` — React Router v7 SPA, the app we work in all day
  - Show `src/` — currently quite flat, we fix that in Module 1
  - Show `main.tsx`: `QueryClientProvider`, `<BrowserRouter>` — two providers, this is where everything starts
  - Run the app and show the journal system live: patient list, click into a patient, journal entries
- `apps/api/` — Hono API, pre-written, participants don't need to touch it
  - Show `src/routes/` — two files, `patients.ts` and `journals.ts`, OpenAPI routers via `@hono/zod-openapi`
  - Show `src/db/schema.ts` — Drizzle schema, two tables: `patients` and `journals`
  - `npm run db:seed` resets to the original seed data if anything goes wrong
  - Open `http://localhost:3001/` — Scalar docs UI, click through the endpoints live
- `apps/medix.com/` — Next.js marketing site, consumes `packages/ui`
  - Brief: this is here to demonstrate the SPA vs server-side rendering contrast — we come back to it in Module 2
- `packages/ui/` — shared component library (`@medix/ui`)
  - Show `src/base/` — generic shadcn primitives (`Badge`, `Button`, `Card`, `Input`, `Label`, `Select`, `Textarea`) imported via the shadcn CLI
  - Show `src/StatusBadge.tsx` — domain-specific wrapper around `<Badge>` that maps `JournalStatus` to color and label
  - Exported via `src/index.ts`. Both apps import from `@medix/ui` — change one place, both apps update
  - We build on this in Module 1

### 10:15 — Module 1: Architecture & Reuse

_Format: Fix it + Build it_

**Theory (5 min):** Feature-based structure, component responsibility, error boundary placement. Participants are used to large classes with many responsibilities — in React the goal is small focused components, and folder structure should reflect what the app _does_, not what kind of file it is.

**Starting point:** Everything sits flat in `src/` — one big `App.tsx` (the starter has no `router.tsx` yet — we add that in Module 2), no feature split, status styling duplicated as inline class names. The starter introduces a single monolithic `PatientPage.tsx` that we'll break apart.

**Individual coding (25 min):**

_Fix it: Structure_

1. Move files into feature folders:
   - `src/features/patients/` — patient list, card, header
   - `src/features/journal/` — journal list, entry
   - `src/components/` — shared UI bits
2. Break `PatientPage.tsx` (one big monolith) into `PatientList`, `PatientCard`, `PatientHeader`
3. Add a top-level `<ErrorBoundary>` in `Layout` around `<Outlet>` — throw an error manually and watch it get caught. (We'll add **local** boundaries near suspending data in Module 4.)

_Build it: Reuse_

4. Look at `packages/ui/src/base/` — generic shadcn primitives (`Badge`, `Button`, `Card`, `Input`, `Select`)
5. Build a domain-specific `<StatusBadge>` that wraps `<Badge>` from base and maps `JournalStatus` (`active` / `closed` / `draft`) to the right variant and label — place it in `packages/ui/src/StatusBadge.tsx`
6. Export it from `packages/ui/src/index.ts`
7. Import and use it in both `arena` and `medix.com` — change one status color and watch both apps update

**Group discussion (10 min):** What did you split out? What was hard to decide?

**Walkthrough (10 min):** Live-code the solution, show the component used in both apps

- _Two-layer component library:_ `base/` is generic shadcn primitives (`Badge`, `Button`, `Card`...) — the foundation. On top we build domain-specific wrappers like `<StatusBadge>` that know the business logic (`active` → green). Apps consume the wrappers, not the primitives directly when a domain concept exists — one mapping change updates the entire system.
- _Component library:_ One source of truth, used everywhere — change one color and both apps update. WPF analogy: `ResourceDictionary` / `Style`. Doesn't need to be published to npm — workspace packages are enough.
- _Why not write everything yourself?_ Accessibility is legally required in healthcare and genuinely hard: a correct `<Dialog>` needs focus trap, `aria-modal`, scroll lock, Escape handling. Most large companies have an internal design system that handles this — figure out what it's built on (Radix, React Aria, headless libraries) and build on top of that instead of writing primitives yourself.

_Briefly mentioned:_ Supply chain risk — now that you've seen how easy it is to publish a package, how easy is it to slip in malicious code? `npm audit` and lockfiles in two minutes.

### 11:15 — Module 2: Routing

_Format: Fix it + demo_

**Theory (5 min):** Client-side routing benefits — no full reload, bookmark support, state preservation across navigation, URL as single source of truth. `<BrowserRouter>` + `<Routes>` declaratively, nested routes with `<Outlet>`, React Router v7 vs Next.js `app/`. Latency during navigation — what do you show the user while the next page loads? Participants are used to navigation without URLs — in React the URL is always synchronized with what the user sees, can be shared and bookmarked.

**Starting point:** Navigation via `window.location.href`, conditional rendering inside `App.tsx`, no React Router.

**Individual coding (15 min):**

1. Wrap the app in `<BrowserRouter>` in `main.tsx`
2. Define routes with `<Routes>` and `<Route>` in a dedicated `AppRoutes` component:
   - `/` — dashboard
   - `/patients` — patient list
   - `/patients/:id` — patient detail
3. Use a shared `<Layout>` with `<Outlet>` as the parent route
4. Replace hardcoded `<a href>` links with `<Link>` and `<NavLink>` in the sidebar
5. Read `:id` with `useParams` in the patient detail page and use it to fetch the right patient

**Group discussion (10 min):** What's the difference between an SPA router and file-based routing in a framework?

**Walkthrough + demo (10 min):** Live-code the solution, open `apps/medix.com/` — show the `app/` structure, `page.tsx`, `loading.tsx`, `layout.tsx`. _"What's the same? What's different? And why does Next.js fit this app better than Arena?"_

### 12:00 — Lunch

### 13:00 — Module 3: State & Effects

_Format: Fix it_

**Theory (5 min):** Rules of React, derived state, when `useEffect` is the wrong tool. Participants are used to triggering logic from events and property setters — in React, components are pure functions, side effects are explicit, and anything you can compute should not be stored.

**Starting point:** Several `useEffect` anti-patterns scattered across components — `setState` inside `useEffect`, duplicated logic across components, unnecessary state.

> **Heads-up:** Leave the data-fetching `useEffect`s alone for now — we replace those with TanStack Query in Module 4. This module is about derived/synced state only.

**Individual coding (15 min):**

1. Find and remove `useEffect` that sets state based on other state — compute derived state directly in render instead
2. Find and remove `useEffect` that synchronizes two state values — collapse into one source
3. Extract search-and-filter logic that appears in two components into a shared `usePatientFilter` hook

**Group discussion (10 min):** When _is_ `useEffect` the right call? What should you have used instead?

**Walkthrough (10 min):** Live-code the solution, briefly mention `useRef` as another escape hatch — mutable values that shouldn't trigger re-render, or direct DOM access

### 13:45 — Module 4: TanStack Query

_Format: Fix it_

**Theory (5 min):** Back to the intro — latency, loading states, race conditions. What actually happens when you fetch data in a component? What caching gives you, and how TanStack Query solves the problems we looked at this morning. Participants are used to writing async infrastructure themselves (loading flags, try/catch, cancel logic) — the goal is showing what they get for free.

**Starting point:** Data is fetched with `useEffect` + `fetch` + a manual `isLoading` boolean. No caching, no race condition handling.

**Individual coding (20 min):**

1. Replace `useEffect`-fetching of the patient list with `useQuery`
   - Add a loading state (spinner/skeleton)
   - Add an error state
2. Replace `useEffect`-fetching of a single patient with `useSuspenseQuery`
   - Wrap the call site in a **local** `<Suspense>` and a **local** `<ErrorBoundary>` so the rest of the page (sidebar, header) stays visible. The Layout-level boundary from Module 1 is the catch-all; this local one is the contextual fallback.
   - Watch the page suspend while data loads
3. Add a `useMutation` to update journal status
   - Invalidate the relevant query on success so the list updates automatically

**Group discussion (10 min):** What happens with race conditions now? What did you get for free from the cache?

**Walkthrough (10 min):** Live-code the solution, show background updates and the devtools

### 14:30 — Break

### 14:45 — Module 5: Forms

_Format: Fix it_

**Theory (5 min):** Controlled vs uncontrolled inputs, why form validation belongs in a schema, not in the component. Participants are used to strict server-side validation — Zod gives the same guarantees on the client.

**Starting point:** An uncontrolled `<form>` with `onSubmit` reading from `event.target`. No validation, manual error state.

**Individual coding (20 min):**

1. Wire the form up to `useForm()` from React Hook Form
2. Write a Zod schema for a new journal entry:
   - Title: required, max 100 characters
   - Date: required
   - Content: required, minimum 10 characters
3. Connect the Zod schema to React Hook Form via `zodResolver`
4. Show inline error messages under each field
5. Disable the submit button while the form is invalid or submitting (`!formState.isValid || formState.isSubmitting`)
6. Submit to the API with `useMutation` — show server error messages if the request fails

**Group discussion (10 min):** What happens when the server returns an error? How do you handle it?

**Walkthrough (10 min):** Live-code the solution, show the full submit flow against the API

- _Note:_ The API also validates incoming data with Zod — call this out explicitly: client validation is for UX, server validation is for security.

### 15:40 — Wrap-up _(20 min)_

_Format: Slides_

- What we covered today
- What's left in the curriculum — TypeScript depth, testing, Zustand, Context, security
- React certification: learning path, what's tested, links

---

## Remaining work

- [x] Build the finished version (`medix-workshop`): monorepo with `apps/arena/`, `apps/api/`, `apps/medix.com/`, `packages/ui/`
- [x] Write the Hono API with patient and journal endpoints (OpenAPI + Scalar docs)
- [x] Set up SQLite + Drizzle with seed data + `npm run db:seed` reset script
- [x] Configure ESLint, Prettier, `copilot-instructions.md` in the finished version
- [x] Set up Vitest + RTL pre-configured (not used today, but ready)
- [x] Verify `turbo dev` works on a fresh clone (macOS — and Windows if relevant)
- [ ] Build the `starter` branch: introduce deliberate bugs and TODOs per module
- [x] Write task descriptions — see [tasks.md](tasks.md)
- [ ] Build slides (intro, module intros, wrap-up)
- [ ] Solo dry-run of the entire workshop
