# Step 1: Architecture and Reuse

## English

## App: Split the monolith

- Open `apps/arena/src/PatientPage.tsx`.
- Before we move code, we need names for the things that already exist on the screen.
- What components can you see in the UI before looking at the code?
- The answers I want to draw out: Patient list, patient card, patient header, journal list, journal entry, form.
- Create `features/patients/components`.
- Create `features/journal/components`.
- Create `components`.
- Create `layouts`.
- Feature folders: group by what the app does. A patient feature can have components, hooks, and API helpers later.
- Move patient list UI into `PatientList.tsx`.
- Move one patient row into `PatientCard.tsx`.
- Move selected patient header into `PatientHeader.tsx`.
- A component should have a name that matches a real concept in the UI. If the name feels fake, the split is probably fake too.
- Move one journal entry into `JournalEntry.tsx`.
- Move journal list rendering into `JournalList.tsx`.
- Move the journal form into `JournalForm.tsx`.
- Keep the current fetching and form logic for now.
- We are not fixing every smell at once. Each module has one job.

## App: Extract layout and boundary

- Move sidebar, mobile header, and page wrapper from `App.tsx` into `layouts/Layout.tsx`.
- Keep local `page` state in `App.tsx`.
- This is still not proper routing. We are only separating the app shell from the page content.
- Create `components/ErrorBoundary.tsx`.
- Wrap the main content area in `ErrorBoundary`.
- Where should an error boundary go if we want the sidebar to stay visible?
- The answers I want to draw out: The boundary should wrap the part that can fail, not necessarily the whole app.
- This first boundary is a catch-all. In the data fetching module we add a more contextual boundary closer to the loading data.

## App: Build shared StatusBadge

- Open `packages/ui/src/base/badge.tsx`.
- This is a primitive. It does not know anything about journals or statuses.
- Create `packages/ui/src/StatusBadge.tsx`.
- Move `JournalStatus` into `@medix/ui`.
- Add status config for `active`, `closed`, and `draft`.
- Render `Badge` inside `StatusBadge`.
- Export `StatusBadge` and `JournalStatus` from `packages/ui/src/index.ts`.
- Why is the mapping from status to color not just a className in the app?
- The point I want to land: it is a shared domain concept, so it should have one home.
- The layering: base primitives at the bottom, domain-specific UI on top, apps consuming the shared component.

## App: Use StatusBadge

- Replace inline status styling in `JournalEntry`.
- Use `StatusBadge` in `apps/medix.com/app/page.tsx`.
- Use `StatusBadge` in `apps/medix.com/app/products/page.tsx`.
- Change one status style and verify that both apps update from one place.
- This is the payoff. One concept, one implementation.
- What should not go into `packages/ui` yet?
- The point I want to land: Keep feature-specific code in the feature until reuse is real.

## Check

- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.
- If a test fails because an import moved, fix the import rather than changing the behavior.

## Norsk

## App: Split monolithen

- Åpne `apps/arena/src/PatientPage.tsx`.
- Før vi flytter kode, trenger vi navn på tingene som allerede finnes på skjermen.
- Hvilke components ser dere i UI før vi ser på koden?
- Svarene jeg vil få frem: Patient list, patient card, patient header, journal list, journal entry, form.
- Lag `features/patients/components`.
- Lag `features/journal/components`.
- Lag `components`.
- Lag `layouts`.
- Feature folders: grupper etter hva appen gjør. En patient feature kan ha components, hooks og API helpers senere.
- Flytt patient list UI til `PatientList.tsx`.
- Flytt én patient row til `PatientCard.tsx`.
- Flytt selected patient header til `PatientHeader.tsx`.
- En component bør ha et navn som matcher et ekte concept i UI. Hvis navnet føles fake, er split-en ofte fake også.
- Flytt én journal entry til `JournalEntry.tsx`.
- Flytt journal list rendering til `JournalList.tsx`.
- Flytt journal form til `JournalForm.tsx`.
- Behold eksisterende fetching og form logic for nå.
- Vi fikser ikke alle smells samtidig. Hver module har én jobb.

## App: Extract layout og boundary

- Flytt sidebar, mobile header og page wrapper fra `App.tsx` til `layouts/Layout.tsx`.
- Behold local `page` state i `App.tsx`.
- Dette er fortsatt ikke ordentlig routing. Vi separerer bare app shell fra page content.
- Lag `components/ErrorBoundary.tsx`.
- Wrap main content area i `ErrorBoundary`.
- Hvor bør en error boundary ligge hvis sidebar skal være synlig?
- Svarene jeg vil få frem: Boundary bør wrappe delen som kan feile, ikke nødvendigvis hele appen.
- Denne første boundary-en er en catch-all. I data fetching module legger vi en mer contextual boundary nærmere data som loader.

## App: Build shared StatusBadge

- Åpne `packages/ui/src/base/badge.tsx`.
- Dette er en primitive. Den vet ingenting om journals eller statuses.
- Lag `packages/ui/src/StatusBadge.tsx`.
- Flytt `JournalStatus` inn i `@medix/ui`.
- Lag status config for `active`, `closed` og `draft`.
- Render `Badge` inne i `StatusBadge`.
- Export `StatusBadge` og `JournalStatus` fra `packages/ui/src/index.ts`.
- Hvorfor er mapping fra status til color ikke bare en className i appen?
- Svarene jeg vil få frem: det er et shared domain concept, så det bør ha ett hjem.
- Layering: base primitives nederst, domain-specific UI oppå, apps bruker shared component.

## App: Use StatusBadge

- Bytt ut inline status styling i `JournalEntry`.
- Bruk `StatusBadge` i `apps/medix.com/app/page.tsx`.
- Bruk `StatusBadge` i `apps/medix.com/app/products/page.tsx`.
- Endre én status style og sjekk at begge apps oppdateres fra ett sted.
- Dette er payoff-en. Ett concept, én implementation.
- Hva bør ikke inn i `packages/ui` ennå?
- Svarene jeg vil få frem: Feature-specific code blir i feature til reuse er ekte.

## Check

- Kjør `npm run typecheck --workspace=apps/arena`.
- Kjør `npm test --workspace=apps/arena -- --run`.
- Hvis en test feiler fordi en import ble flyttet, fiks importen i stedet for behavior.
