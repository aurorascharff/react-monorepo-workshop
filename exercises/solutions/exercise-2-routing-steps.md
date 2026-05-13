# Exercise Two: Routing — Walkthrough

> Companion to [`exercise-2-routing.md`](../exercise-2-routing.md). Read the brief first; come back here for one workable order of operations with the rationale.

## Problem

The problem isn't adding a router — it's that the browser doesn't know what screen the app is on. Refresh, back, forward, bookmarks, and copied links all depend on the URL.

Prove the problem in 30 seconds:

1. Click between Dashboard and Patients — the URL stays at `/`.
2. Open a patient detail view, then refresh — you land on the dashboard.
3. Copy the URL while looking at a patient, paste it in a new tab — wrong screen.

The job is to delete the local navigation state in `App.tsx` and let [React Router](https://reactrouter.com/) own it. Decide the route table before writing code:

| Route           | Page component      |
| --------------- | ------------------- |
| `/`             | `DashboardPage`     |
| `/patients`     | `PatientListPage`   |
| `/patients/:id` | `PatientDetailPage` |
| `*`             | `NotFoundPage`      |

## Task

### 1. Add `BrowserRouter` and create routes

In [`apps/arena/src/main.tsx`](../../apps/arena/src/main.tsx), wrap the tree in [`BrowserRouter`](https://reactrouter.com/api/declarative-routers/BrowserRouter):

```tsx
import { BrowserRouter } from 'react-router'
import { AppRoutes } from './router'
;<BrowserRouter>
  <AppRoutes />
</BrowserRouter>
```

Then create `apps/arena/src/router.tsx` with [`Routes`](https://reactrouter.com/api/components/Routes) and [`Route`](https://reactrouter.com/api/components/Route):

```tsx
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="patients" element={<PatientListPage />} />
        <Route path="patients/:id" element={<PatientDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
```

The page imports will fail until step 2 — that's expected.

> [`BrowserRouter`](https://reactrouter.com/api/declarative-routers/BrowserRouter) uses the [browser History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) so navigation happens without a full reload. This is [React Router declarative SPA mode](https://reactrouter.com/start/declarative/installation), not framework mode.

> **Why nested routes?** The shell (sidebar, mobile header) stays mounted as you navigate. Nesting tells React Router "render `RootLayout` once; swap only the [`<Outlet />`](https://reactrouter.com/api/components/Outlet) content when the child URL changes." That's free state preservation — scroll, focus, in-progress UI — for nothing.

### 2. Turn screens into route pages

Create `apps/arena/src/pages/` with one file per route:

- [`DashboardPage.tsx`](../../apps/arena/src/pages/DashboardPage.tsx) — move/rename the dashboard view.
- [`PatientListPage.tsx`](../../apps/arena/src/pages/PatientListPage.tsx) — renders the patient list; for now keep its own `useEffect` + `fetchPatients`. Exercise 4 replaces that.
- [`PatientDetailPage.tsx`](../../apps/arena/src/pages/PatientDetailPage.tsx) — reads `id` from the URL (step 4), fetches patient + journals, renders `PatientHeader` / `JournalList` / `JournalForm`. Carry over the contextual `<ErrorBoundary>` that wrapped the detail render in Exercise One — it now sits around the conditional patient content inside this page.
- [`NotFoundPage.tsx`](../../apps/arena/src/pages/NotFoundPage.tsx) — a small "Page not found" with a link back to `/`.

Each page owns the data its route needs. Pages don't import each other.

> **One page per URL** is the seam that lets the router lazy-load each independently (see the bonus). With local state, one component could conditionally render either view; with routing, each URL is a different page.

### 3. Convert the root layout to use `Outlet` and `NavLink`

In [`apps/arena/src/layouts/RootLayout.tsx`](../../apps/arena/src/layouts/RootLayout.tsx) — the component you extracted in Exercise 1, now wired up as the [parent route](https://reactrouter.com/start/declarative/routing#nested-routes):

- Drop the `children`, `activePage`, `onNavigate` props.
- Render [`<Outlet />`](https://reactrouter.com/api/components/Outlet) inside the existing layout-level `<ErrorBoundary>` (keep its contextual props — `title`, `message`, `logContext` — from Exercise One).
- Replace navigation `<button>` elements with [`<NavLink>`](https://reactrouter.com/api/components/NavLink). Use `isActive` from the `className` callback.

```tsx
const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
]

<NavLink
  to={to}
  end={end}
  className={({ isActive }) =>
    cn('...', isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')
  }
>
  <Icon /> {label}
</NavLink>

<main>
  <ErrorBoundary
    title="This page is unavailable"
    message="Something on this page failed. Try a different section or refresh the page."
    logContext="App layout boundary"
  >
    <Outlet />
  </ErrorBoundary>
</main>
```

Inspect the nav in DevTools Elements before and after — the HTML goes from `<button>` to `<a href>`.

> **Why `<NavLink>` for navigation, `<button>` for actions?** A [link](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links) goes somewhere; a [button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) does something. The browser already knows the difference — middle-click opens links in new tabs, screen readers announce them differently, crawlers index them. Wrong element = lose all of that.

> **Why `end: true` on the Dashboard link?** Without it, the Dashboard link (`/`) stays active on every page — every URL starts with `/`. `end` means "active only when the URL matches exactly."

> **Why derive active nav from the URL, not state?** The URL already knows the active route. Storing it twice means two ways to disagree.

### 4. Replace local navigation with URL-based navigation

Use [`<Link>`](https://reactrouter.com/api/components/Link) for navigation, keep `<button>` for actions, and read the patient id from the route on the detail page.

- `PatientCard`: replace the click handler with `<Link to={\`/patients/${patient.id}\`}>`. Drop the `onSelect` prop.
- Dashboard: replace the "Recent patients" rows and "See all" / "Go to patient list" buttons with `<Link>`. Drop the `onNavigate` prop.
- `PatientDetailPage`: read `id` via [`useParams`](https://reactrouter.com/api/hooks/useParams):

```tsx
import { useParams, Link } from 'react-router'

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  if (!id) return null
  // fetch patient + journals using `id`
}
```

The `<Link to="/patients">` at the top replaces the old `onBack` callback — "back" is now a URL change.

> **Why does `id` come from the URL, not props?** With routing, the URL is the source of truth. Each page reads its own state from the URL — that's what makes refresh and direct paste work.

> **`if (!id) return null`** narrows the type ([`useParams<{ id: string }>()`](https://reactrouter.com/api/hooks/useParams) returns `string | undefined`) and handles trailing-slash edge cases. Route params are strings — convert or validate when type matters.

### 5. Verify browser behavior

Try refresh, back, forward, copied URLs, and an unknown URL:

1. URL becomes `/`, `/patients`, `/patients/abc-123` as you navigate.
2. Refresh on `/patients/abc-123` — same patient loads.
3. Back to `/patients`, forward back to the patient.
4. Paste `/not-a-real-route` — `NotFoundPage` renders inside the shell.

> Refresh and direct-paste are the two flows local-state navigation can't fake. If they work, the URL really is the source of truth.

### Compare with the marketing site

Open [`apps/medix.com/app`](../../apps/medix.com/app) and look at `page.tsx`, `layout.tsx`, and the nested route folders. The [Next.js App Router](https://nextjs.org/docs/app) gets routes from files; React Router gets routes from route components. Same core idea: URL maps to UI.

Open [localhost:3000](http://localhost:3000) and inspect the document request in DevTools Network. The HTML response already contains meaningful content before any client JS runs. Compare with Arena on [localhost:5173](http://localhost:5173), where the browser receives the SPA shell.

> **Why might medix.com fit framework routing better than Arena?** Public content, SEO, server rendering, static pages. Arena is an authenticated workflow app — nothing for a crawler to index.

## Bonus

### 1. Lazy-load the route pages

Wrap each page in [`React.lazy`](https://react.dev/reference/react/lazy) so each route gets its own JS chunk. Use [`Suspense`](https://react.dev/reference/react/Suspense) for the loading fallback:

```tsx
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)

<Route index element={
  <Suspense fallback={<Spinner />}>
    <DashboardPage />
  </Suspense>
} />
```

DevTools → Network → "JS" filter. Navigate and watch separate chunks load on demand.

> Tiny here, but the pattern matters: lazy-loading means the detail screen's code doesn't ship until a patient is opened. On larger apps that's 200KB vs. 2MB initial bundle.

### 2. Put search and gender in URL search params

Move `search` and `genderFilter` from local `useState` into [`useSearchParams`](https://reactrouter.com/api/hooks/useSearchParams). A filtered list can then be copied, refreshed, and shared. Reset by writing an empty `URLSearchParams` to `setSearchParams`.

> Filter state owned by the URL becomes a complete description of what the user sees.

## Resources

- [React Router: Routing](https://reactrouter.com/start/declarative/routing) · [Navigating](https://reactrouter.com/start/declarative/navigating) · [URL values](https://reactrouter.com/start/declarative/url-values)
- [`useParams`](https://reactrouter.com/api/hooks/useParams) · [`useSearchParams`](https://reactrouter.com/api/hooks/useSearchParams) · [`<Outlet>`](https://reactrouter.com/api/components/Outlet) · [`<NavLink>`](https://reactrouter.com/api/components/NavLink) · [`<Link>`](https://reactrouter.com/api/components/Link)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React: `lazy`](https://react.dev/reference/react/lazy) · [`Suspense`](https://react.dev/reference/react/Suspense)
- [MDN: Links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links) · [Buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) · [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
