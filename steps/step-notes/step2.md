# Step 2: Routing

## Before They Work

- Say: the problem is not adding a router. The problem is that the browser does not know what screen we are on.
- Question: what breaks when URL, refresh, back, forward, and sharing do not match the UI?
- Answer: routing makes navigation part of the web, not only local React state.
- Show Exercise Two in [`exercises/exercise-2-routing.md`](../../exercises/exercise-2-routing.md).

## Participant Work

- Work time: roughly 25 minutes.
- Discussion: roughly 5 minutes.
- Listen for links versus buttons, nested routes, `Outlet`, route params, and URL-owned navigation.
- Question before live coding: what changed in browser behavior once the URL owned navigation?

## Show the Problem

- Click between Dashboard and Patients.
- Refresh while looking at a patient detail view.
- Use the address bar and browser back button.
- Say: the app can show screens, but the browser does not know where we are.
- Question: what do we lose when the URL is not the source of truth?
- Answer: refresh, back button, bookmarks, links, and sharing.

## Add BrowserRouter

- Open `apps/arena/src/main.tsx`.
- Import [`BrowserRouter`](https://reactrouter.com/api/declarative-routers/BrowserRouter) from `react-router`.
- Wrap the app entry. Once `AppRoutes` exists, wrap `<AppRoutes />`.
- Say: `BrowserRouter` uses the [browser history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) so navigation can happen without a full page reload.
- This is [React Router declarative SPA mode](https://reactrouter.com/start/declarative/installation), not framework mode.

## Create Route Pages and Routes

- Move or copy `Dashboard.tsx` to `pages/DashboardPage.tsx`.
- Create `pages/PatientListPage.tsx`, `pages/PatientDetailPage.tsx`, and `pages/NotFoundPage.tsx`.
- Create `apps/arena/src/router.tsx`.
- Add [routes](https://reactrouter.com/start/declarative/routing) for `/`, `/patients`, `/patients/:id`, and `*`.
- Use a parent route with `Layout` and child pages through [`Outlet`](https://reactrouter.com/api/components/Outlet).
- Question: which UI should stay mounted while child routes change?
- Answer: the shell: sidebar, mobile header, and shared wrapper.

## Update Layout Navigation

- Open `apps/arena/src/layouts/Layout.tsx`.
- Import [`Outlet`](https://reactrouter.com/api/components/Outlet) and [`NavLink`](https://reactrouter.com/api/components/NavLink).
- Remove `children`, `activePage`, and `onNavigate`.
- Render `<Outlet />` inside the existing `ErrorBoundary`.
- Replace navigation buttons with `NavLink`.
- Inspect the navigation in Elements before and after.
- Question: what is the difference between a link and a button?
- Answer: links navigate to another URL; buttons perform an action. This matters for accessibility and browser behavior.
- Use `isActive` to style active navigation.
- Question: why derive active nav from the URL instead of state?
- Answer: the URL already knows the active route.
- Links: MDN on [links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links) and [buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button).

## Link to Details

- Update `PatientCard` to render a [`Link`](https://reactrouter.com/api/components/Link) to `/patients/${patient.id}`.
- Update dashboard navigation to use [`Link`](https://reactrouter.com/api/components/Link).
- In `PatientDetailPage`, use [`useParams`](https://reactrouter.com/api/hooks/useParams).
- Read `id` from the URL, fetch the selected patient and journals, and pass them into the journal components.
- Say: route params are strings. Convert or validate when type matters.
- Verify URL changes, refresh on detail, back/forward, and opening a copied patient URL.
- Question: what changed in UX even though the UI looks almost the same?
- Answer: the app behaves like a browser app, not a local state switcher.

## Compare with Next.js

- Open `apps/medix.com/app`.
- Show `page.tsx`, `layout.tsx`, and nested route folders.
- Say: [Next.js App Router](https://nextjs.org/docs/app) gets routes from files. React Router gets routes from route components. The core idea is still URL maps to UI.
- Open medix.com on [localhost:3000](http://localhost:3000).
- In Network, select the document request and preview the response.
- Point out meaningful HTML in the document response before client JavaScript runs.
- Compare with Arena on [localhost:5173](http://localhost:5173), where the browser receives the SPA shell.
- Question: why might medix.com fit framework routing better than Arena?
- Answer: public content, SEO, server rendering, and static pages.

## Bonus

- Try lazy-loading route pages with [`lazy`](https://react.dev/reference/react/lazy) and [`Suspense`](https://react.dev/reference/react/Suspense).
- Open Network and show the extra JavaScript chunk.
- Question: what should happen while route code is loading?
- Answer: show a clear global loading state without losing the shell. A spinner is okay here because the router does not know the next route shape.

## Close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
