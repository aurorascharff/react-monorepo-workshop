# Step 2: Routing

## Frame what we are solving

- Say: the problem is not adding a router for its own sake. The problem is that the browser does not know what screen we are on.
- Ask: what breaks or feels wrong when URL, refresh, back, forward, and sharing do not match the UI?
- Land this: routing makes navigation part of the web, not only local React state.
- Show Module 2 in [`exercises/module-2-routing.md`](../../exercises/module-2-routing.md).

## Participant work (roughly 10 minutes)

- Ask participants to work in `apps/arena`.
- Listen for links versus buttons, nested routes, where `Outlet` belongs, how route params flow into page code, and whether navigation uses links for navigation and buttons for actions.

## Group discussion (roughly 5 minutes)

- Focus on what changed when people moved from local state to routes, and which routing concepts felt unclear.
- Land this point: the route tree gives structure to the app. The layout stays mounted while the active child route changes.
- Ask before live coding: what changed in browser behavior once the URL owned navigation?

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
- Import [`BrowserRouter`](https://reactrouter.com/api/declarative-routers/BrowserRouter) from `react-router`.
- Wrap `<App />` with `<BrowserRouter>`.
- `BrowserRouter` uses the [browser history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) so navigation can happen without a full page reload.
- This is [React Router in declarative SPA mode](https://reactrouter.com/start/declarative/installation), not framework mode.

## App: Create routes

- Create `apps/arena/src/router.tsx`.
- Add `AppRoutes`.
- Add [routes](https://reactrouter.com/start/declarative/routing) for `/`, `/patients`, `/patients/:id`, and `*`.
- Use a parent route with `Layout`.
- Render child pages through [`Outlet`](https://reactrouter.com/api/components/Outlet).
- Which part of the UI should stay mounted while child routes change?
- Answer to land: the app shell should stay mounted: sidebar, mobile header, and shared wrapper.

## App: Update layout navigation

- Open `apps/arena/src/layouts/Layout.tsx`.
- Import [`Outlet`](https://reactrouter.com/api/components/Outlet) and [`NavLink`](https://reactrouter.com/api/components/NavLink).
- Remove `children`, `activePage`, and `onNavigate`.
- Render `<Outlet />` inside the existing `ErrorBoundary`.
- This is the same shell/content boundary from Module 1. Routing changes the content slot from `children` to `Outlet`.
- Replace navigation buttons with `NavLink`.
- Open Elements and inspect the navigation before and after the change.
- What is the difference between a link and a button? MDN describes [links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links) as navigation to another resource, while [buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) are for actions.
- Answer to land: links navigate to another URL; buttons perform an action. This matters for accessibility, browser behavior, and user expectations.
- Use `isActive` to style the active navigation item.
- Why should active nav be derived from the URL instead of stored in state?
- Answer to land: the URL already knows the active route, so storing it separately creates another source of truth.

## App: Create pages

- Move or copy `Dashboard.tsx` to `pages/DashboardPage.tsx`.
- Create `pages/PatientListPage.tsx`.
- Create `pages/PatientDetailPage.tsx`.
- Create `pages/NotFoundPage.tsx`.
- Route-level pages: pages wire route data and feature components together. Feature components still live inside `features`.

## App: Link to details

- Update `PatientCard` to render a [`Link`](https://reactrouter.com/api/components/Link) to `/patients/${patient.id}`.
- Update dashboard navigation to use [`Link`](https://reactrouter.com/api/components/Link).
- Open the app and verify that the URL changes.
- Refresh on a patient detail page.
- Use back and forward.
- Copy a patient detail URL, paste it into a new tab, and verify it opens the same state.
- What changed in the user experience even though the UI looks almost the same?
- Answer to land: the app now behaves like a browser app, not a local state switcher.
- What should happen while a route is loading?
- Answer to land: the user should get a clear loading state without losing the whole shell.

## App: Read route params

- In `PatientDetailPage`, use [`useParams`](https://reactrouter.com/api/hooks/useParams).
- Read `id` from the URL.
- Fetch the selected patient by id.
- Pass `id` to `JournalList` and `JournalForm`.
- `:id` as a [dynamic route segment](https://reactrouter.com/start/declarative/url-values).
- Route params are strings. Convert or validate when the type matters.

## App: Compare with Next.js

- Open `apps/medix.com/app`.
- Show `page.tsx`, `layout.tsx`, and any nested route folders.
- [Next.js App Router](https://nextjs.org/docs/app) gets routes from files. React Router gets routes from route components. The core idea is still URL maps to UI.
- Open medix.com in the browser on [localhost:3000](http://localhost:3000).
- Open Network, select the document request, and preview the response.
- Point out that the HTML for the page is already in the document response before client JavaScript runs.
- Compare that with Arena on [localhost:5173](http://localhost:5173), where the browser receives the SPA shell and React renders the app on the client.
- This is the concrete version of the earlier rendering strategy and browser behavior discussion: framework-rendered pages can send meaningful HTML first, while the SPA depends more on client-side rendering.
- Why might medix.com fit framework routing better than Arena?
- Answer to land: public content, SEO, server rendering, and static pages.

## Check and module close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
