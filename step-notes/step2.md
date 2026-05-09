# Step 2: Routing

## English

## App: Show the navigation problem

- Open the app before changing code.
- Click between Dashboard and Patients.
- Refresh while looking at a patient detail view.
- The app can show different screens, but the browser does not know where we are.
- What do we lose when the URL is not the source of truth?
- The answers I want to draw out: refresh, back button, bookmarks, links, and sharing.

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
- The answers I want to draw out: This is the app shell: sidebar, mobile header, shared wrapper.

## App: Update layout navigation

- Open `apps/arena/src/layouts/Layout.tsx`.
- Import `Outlet` and `NavLink`.
- Remove `children`, `activePage`, and `onNavigate`.
- Render `<Outlet />` inside the existing `ErrorBoundary`.
- Replace navigation buttons with `NavLink`.
- Use `isActive` to style the active navigation item.
- Buttons perform actions. Links navigate. This matters for accessibility, browser behavior, and user expectations.
- Why should active nav be derived from the URL instead of stored in state?
- The answers I want to draw out: The URL already knows the active route.

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
- What changed in the user experience even though the UI looks almost the same?
- The answers I want to draw out: The app now behaves like a browser app, not a local state switcher.

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
- The answers I want to draw out: Public content, SEO, server rendering, static pages.

## Check

- Run `npm run typecheck --workspace=apps/arena`.

## Norsk

## App: Vis navigation-problemet

- Åpne appen før du endrer kode.
- Klikk mellom Dashboard og Patients.
- Refresh mens du ser på en patient detail view.
- Appen kan vise ulike screens, men browseren vet ikke hvor vi er.
- Hva mister vi når URL-en ikke er source of truth?
- Svarene jeg vil få frem: Trekk frem refresh, back button, bookmarks, links og sharing.

## App: Add BrowserRouter

- Åpne `apps/arena/src/main.tsx`.
- Importer `BrowserRouter` fra `react-router`.
- Wrap `<App />` med `<BrowserRouter>`.
- `BrowserRouter` bruker browser history API så navigation kan skje uten full page reload.
- Dette er React Router i SPA mode, ikke framework mode.

## App: Create routes

- Lag `apps/arena/src/router.tsx`.
- Legg til `AppRoutes`.
- Legg til routes for `/`, `/patients`, `/patients/:id` og `*`.
- Bruk en parent route med `Layout`.
- Render child pages gjennom `Outlet`.
- Hvilken del av UI bør være mounted mens child routes endres?
- Svarene jeg vil få frem: Dette er app shell: sidebar, mobile header, shared wrapper.

## App: Update layout navigation

- Åpne `apps/arena/src/layouts/Layout.tsx`.
- Importer `Outlet` og `NavLink`.
- Fjern `children`, `activePage` og `onNavigate`.
- Render `<Outlet />` inne i eksisterende `ErrorBoundary`.
- Bytt navigation buttons med `NavLink`.
- Bruk `isActive` til å style active navigation item.
- Buttons utfører actions. Links navigerer. Det betyr noe for accessibility, browser behavior og user expectations.
- Hvorfor bør active nav være derived fra URL-en i stedet for lagret i state?
- Svarene jeg vil få frem: URL-en vet allerede active route.

## App: Create pages

- Flytt eller copy `Dashboard.tsx` til `pages/DashboardPage.tsx`.
- Lag `pages/PatientListPage.tsx`.
- Lag `pages/PatientDetailPage.tsx`.
- Lag `pages/NotFoundPage.tsx`.
- Route-level pages: pages wire route data og feature components sammen. Feature components ligger fortsatt i `features`.

## App: Link to details

- Oppdater `PatientCard` til å render en `Link` til `/patients/${patient.id}`.
- Oppdater dashboard navigation til å bruke `Link`.
- Åpne appen og sjekk at URL-en endres.
- Refresh på en patient detail page.
- Bruk back og forward.
- Hva endret seg i user experience selv om UI ser nesten lik ut?
- Svarene jeg vil få frem: Appen oppfører seg nå som en browser app, ikke en local state switcher.

## App: Read route params

- I `PatientDetailPage`, bruk `useParams`.
- Les `id` fra URL-en.
- Fetch selected patient by id.
- Send `id` til `JournalList` og `JournalForm`.
- `:id` som dynamic route segment.
- Route params er strings. Convert eller validate når type betyr noe.

## App: Compare with Next.js

- Åpne `apps/medix.com/app`.
- Vis `page.tsx`, `layout.tsx` og eventuelle nested route folders.
- Next.js får routes fra files. React Router får routes fra route components. Core idea er fortsatt URL maps to UI.
- Hvorfor passer medix.com kanskje bedre for framework routing enn Arena?
- Svarene jeg vil få frem: Public content, SEO, server rendering, static pages.

## Check

- Kjør `npm run typecheck --workspace=apps/arena`.
