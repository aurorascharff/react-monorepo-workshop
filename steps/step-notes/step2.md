# Step 2: Routing

## App: Show the navigation problem

- Open the app before changing code.
- Click between Dashboard and Patients.
- Refresh while looking at a patient detail view.
- Use the address bar and browser back button while doing this.
- The app can show different screens, but the browser does not know where we are.
- What do we lose when the URL is not the source of truth?
- Answer to land: refresh, back button, bookmarks, links, and sharing.

## App: Add BrowserRouter

- Open `apps/arena/src/main.tsx`.
- Import `BrowserRouter` from `react-router`.
- Wrap `<App />` with `<BrowserRouter>`.
- `BrowserRouter` uses the browser history API so navigation can happen without a full page reload.
- This is React Router in SPA mode, not framework mode.

## App: Create routes

- Create `apps/arena/src/router.tsx`.
- Add `AppRoutes`.
- Add routes for `/`, `/patients`, `/patients/:id`, and `*`.
- Use a parent route with `Layout`.
- Render child pages through `Outlet`.
- Which part of the UI should stay mounted while child routes change?
- Answer to land: the app shell should stay mounted: sidebar, mobile header, and shared wrapper.

## App: Update layout navigation

- Open `apps/arena/src/layouts/Layout.tsx`.
- Import `Outlet` and `NavLink`.
- Remove `children`, `activePage`, and `onNavigate`.
- Render `<Outlet />` inside the existing `ErrorBoundary`.
- Replace navigation buttons with `NavLink`.
- Open Elements and inspect the navigation before and after the change.
- What is the difference between a link and a button?
- Answer to land: links navigate to another URL; buttons perform an action. This matters for accessibility, browser behavior, and user expectations.
- Use `isActive` to style the active navigation item.
- Buttons perform actions. Links navigate. This matters for accessibility, browser behavior, and user expectations.
- Why should active nav be derived from the URL instead of stored in state?
- Answer to land: the URL already knows the active route, so storing it separately creates another source of truth.

## App: Create pages

- Move or copy `Dashboard.tsx` to `pages/DashboardPage.tsx`.
- Create `pages/PatientListPage.tsx`.
- Create `pages/PatientDetailPage.tsx`.
- Create `pages/NotFoundPage.tsx`.
- Route-level pages: pages wire route data and feature components together. Feature components still live inside `features`.

## App: Link to details

- Update `PatientCard` to render a `Link` to `/patients/${patient.id}`.
- Update dashboard navigation to use `Link`.
- Open the app and verify that the URL changes.
- Refresh on a patient detail page.
- Use back and forward.
- Copy a patient detail URL, paste it into a new tab, and verify it opens the same state.
- What changed in the user experience even though the UI looks almost the same?
- Answer to land: the app now behaves like a browser app, not a local state switcher.
- What should happen while a route is loading?
- Answer to land: the user should get a clear loading state without losing the whole shell. We solve this more fully in Module 4.

## App: Read route params

- In `PatientDetailPage`, use `useParams`.
- Read `id` from the URL.
- Fetch the selected patient by id.
- Pass `id` to `JournalList` and `JournalForm`.
- `:id` as a dynamic route segment.
- Route params are strings. Convert or validate when the type matters.

## App: Compare with Next.js

- Open `apps/medix.com/app`.
- Show `page.tsx`, `layout.tsx`, and any nested route folders.
- Next.js gets routes from files. React Router gets routes from route components. The core idea is still URL maps to UI.
- Why might medix.com fit framework routing better than Arena?
- Answer to land: public content, SEO, server rendering, and static pages.

## Check

- Run `npm run typecheck --workspace=apps/arena`.
