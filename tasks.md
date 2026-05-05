# Module Tasks

All tasks happen in `apps/arena/`, starting from the `klinikk-workshop-starter` codebase.  
Reference solution lives in `klinikk-workshop` (the finished version).

> Step-by-step instructions live in [plan.md](plan.md).  
> This file describes the **goal** for each module — _what_ should be true when you're done, not the steps to get there.

---

## Module 1 — Architecture & Reuse

**Goal:** Make the codebase readable and reusable.

- Files are organized by _what the app does_, not by file type
- Each component has a single responsibility
- Domain logic (e.g. status → color) lives in the component library, not scattered across apps
- An error in one part of the page does not crash the whole app

---

## Module 2 — Routing

**Goal:** The URL is the source of truth for what the user sees.

- Each page has its own URL and can be bookmarked
- Navigation happens without a full page reload
- Shared UI (header, sidebar) is shared across pages without duplication
- The active page is visually clear in the navigation

---

## Module 3 — State & Effects

**Goal:** State is minimal and derived where possible.

- Anything computable is computed — not stored
- No `useEffect` synchronizing state with other state
- Logic used in multiple places is extracted into a hook
- ESLint reports no `react-hooks` warnings

---

## Module 4 — TanStack Query

**Goal:** Data is handled declaratively — we describe _what_ we want, not _how_ to fetch it.

- No `useEffect` is used for data fetching
- Loading and error states are visible to the user
- The cache is reused across navigation (fast back/forward)
- Mutations update relevant queries automatically
- Network errors are caught by an error boundary

---

## Module 5 — Forms

**Goal:** Invalid data never leaves the form.

- Validation is defined in a Zod schema, not scattered across the component
- Error messages appear per field
- Submit is disabled or blocked while the form is invalid
- A successful submit updates the UI without a manual refresh
- Server errors are surfaced to the user in a meaningful way
