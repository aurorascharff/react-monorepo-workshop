# Step 0: Starter Run-Through

## English

## App: Open the starter

- Start with the app running, not the code.
- Show Dashboard, Patients, one patient detail page, journal entries, status select, and the new journal form.
- The starter is supposed to work. The point is not to fix a broken app from zero. The point is to improve code that looks like a lot of real project code.
- What parts of this app do you expect to get messy as it grows?
- The answers I want to draw out: navigation, forms, shared UI, fetching, and state.

## App: Run the monorepo

- Open `README.md`.
- Run `npm install`, `npm run db:seed`, and `npm run dev`.
- Open Arena on `localhost:5173`.
- Open the API docs on `localhost:3001`.
- Open medix.com on `localhost:3000`.
- One command starts several workspaces because this is an npm workspace with Turborepo.
- What is useful about running the app, API, and shared package from the same repo?
- The answers I want to draw out: the practical answers: one local setup, shared code, one PR for changes across boundaries, consistent tooling.

## App: Read the code we start from

- Open `apps/arena/src/App.tsx`.
- The local page state.
- This works, but the URL has no idea what screen we are looking at. That is why routing gets its own module.
- The layout code in the same file.
- The shell and the page content are mixed together. That is one of the first things we will separate.
- Open `apps/arena/src/PatientPage.tsx`.
- Scroll slowly. Do not fix anything yet.
- This file has patient list, patient detail, journals, form, status styling, fetching, and mutation logic.
- If you had to change only the status colors, where would you look?
- If you had to change only the form validation, where would you look?
- Let them feel that the file has too many reasons to change.

## App: Show API and shared UI

- Open `apps/api/src/routes`.
- The API is pre-written. We can read it, but we are not spending the day building backend endpoints.
- Open `apps/api/src/db/schema.ts` if the data model needs context.
- Open `packages/ui/src/base`.
- Primitives: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`.
- Open `packages/ui/src/index.ts`.
- Apps should import public UI from here, not deep internal paths.
- When should something move into `packages/ui`?
- The point I want to land: when more than one app needs the same concept, or when a shared concept should have one implementation.

## App: Tests and AI setup

- Run `npm test` if there is time.
- Starter tests are intentionally small so we do not reveal future folders before we create them.
- Open `AGENTS.md` briefly.
- GitHub Copilot and `/react-best-practices`.
- AI setup is useful for scoped context, but we still need to understand the shape of the code.

## Norsk

## App: Åpne starter

- Start med appen kjørende, ikke koden.
- Vis Dashboard, Patients, en patient detail page, journal entries, status select og new journal form.
- Starter-en skal fungere. Poenget er ikke å fikse en ødelagt app fra null. Poenget er å forbedre kode som ligner mye på ekte project code.
- Hvilke deler av denne appen tror dere blir rotete når den vokser?
- Svarene jeg vil få frem: Lytt etter navigation, forms, shared UI, fetching og state.

## App: Kjør monorepo

- Åpne `README.md`.
- Kjør `npm install`, `npm run db:seed` og `npm run dev`.
- Åpne Arena på `localhost:5173`.
- Åpne API docs på `localhost:3001`.
- Åpne medix.com på `localhost:3000`.
- én kommando starter flere workspaces fordi dette er et npm workspace med Turborepo.
- Hva er nyttig med å kjøre app, API og shared package fra samme repo?
- Svarene jeg vil få frem: de praktiske svarene: ett local setup, shared code, én PR på tvers av boundaries, consistent tooling.

## App: Les koden vi starter med

- Åpne `apps/arena/src/App.tsx`.
- Local page state.
- Dette fungerer, men URL-en vet ikke hvilken screen vi ser på. Derfor får routing sin egen module.
- Layout code i samme fil.
- Shell og page content er blandet sammen. Det er noe av det første vi separerer.
- Åpne `apps/arena/src/PatientPage.tsx`.
- Scroll sakte. Ikke fiks noe ennå.
- Denne filen har patient list, patient detail, journals, form, status styling, fetching og mutation logic.
- Hvis dere bare skulle endre status colors, hvor ville dere lett?
- Hvis dere bare skulle endre form validation, hvor ville dere lett?
- La dem kjenne at filen har for mange reasons to change.

## App: Vis API og shared UI

- Åpne `apps/api/src/routes`.
- API-et er ferdig skrevet. Vi kan lese det, men vi skal ikke bruke dagen på backend endpoints.
- Åpne `apps/api/src/db/schema.ts` hvis data model trenger context.
- Åpne `packages/ui/src/base`.
- Primitives: `Button`, `Card`, `Input`, `Select`, `Textarea`, `Badge`.
- Åpne `packages/ui/src/index.ts`.
- Apps bør importere public UI herfra, ikke fra deep internal paths.
- Når bør noe flyttes inn i `packages/ui`?
- Svarene jeg vil få frem: når mer enn én app trenger samme concept, eller når et shared concept bør ha én implementation.

## App: Tests og AI setup

- Kjør `npm test` hvis det er tid.
- Starter tests er bevisst små så vi ikke avslører future folders før vi lager dem.
- Åpne `AGENTS.md` kort.
- GitHub Copilot og `/react-best-practices`.
- AI setup er nyttig for scoped context, men vi må fortsatt forstå formen på koden.
