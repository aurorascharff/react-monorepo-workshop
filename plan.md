# Workshop Plan: Best Practice og Moderne React

**Kursholder:** Aurora Scharff  
**Varighet:** En dag, kl. 09:00–16:00  
**Deltakere:** Inntil 40 personer (~8–10 grupper à 4–5)  
**Sted:** Gullhaug Torg 5, Nydalen

---

## Format

- Codebase er bevisst "feil" — deltakere fikser det per modul
- Ny funksjonalitet live-codes av kursholder
- Sakte og samtalende — les kode sammen, spørsmål velkommen
- Ferdig tidlig? Rett opp hånda og hjelp andre i gruppen

**Per modul:**

```
5 min   — Teori-intro (slides)
15 min  — Individuell koding (TODOs i codebase)
10 min  — Gruppediskusjon
10 min  — Felles gjennomgang / live-code
```

---

## Tech Stack

| Kategori  | Valg                                                      |
| --------- | --------------------------------------------------------- |
| Rammeverk | React Router v7 (SPA)                                     |
| Backend   | Hono (pre-skrevet, kjører lokalt)                         |
| Database  | SQLite + Drizzle ORM                                      |
| Monorepo  | Turborepo                                                 |
| Styling   | Tailwind CSS + shadcn/ui                                  |
| Data      | TanStack Query                                            |
| Skjema    | React Hook Form + Zod                                     |
| Tooling   | ESLint, Prettier, TypeScript                              |
| Testing   | Vitest + React Testing Library (pre-konfigurert)          |
| AI        | GitHub Copilot + `copilot-instructions.md` + agent skills |

**Repos:**

- `dips-workshop` — ferdig løsning (bygges først)
- `dips-workshop-starter` — utgangspunkt for deltakere (lages fra ferdig versjon ved å introdusere bevisste feil og TODOs)

> Repoet og pakker er navngitt rundt fiktive **Klinikk** og **Arena** — ingen direkte DIPS-referanser i kildekoden.

**Repo-struktur:**

```
apps/
  arena/        ← React Router v7 SPA (journalsystem — workshop-appen)
  api/          ← Hono API (pre-skrevet, OpenAPI + Scalar-docs på /)
  klinikk.no/   ← Next.js (markedsføringsside — SSR, SEO, statisk innhold)
packages/
  ui/           ← delt komponentbibliotek (`@klinikk/ui`, shadcn-base + custom)
```

`turbo dev` starter alle apper parallelt. API-en er ferdigskrevet — deltakere trenger ikke røre den, men kan lese og forstå den. SQLite-fil er inkludert i repo med seed-data (pasienter, journaloppføringer). API-en eksponerer en interaktiv dokumentasjons-UI (Scalar) på rot-URL-en, slik at deltakere kan utforske endepunktene visuelt.

**App-domene:** `arena/` er et journalsystem inspirert av norske sykehus-EPJ — pasientliste, journaloppføringer, skjemaer. `klinikk.no/` er en enkel markedsføringsside som bruker komponenter fra `packages/ui` og demonstrerer hvorfor Next.js gir mening for innholdsrike, offentlige sider (SEO, statisk generering, SSR).

**Deltakerbakgrunn:** Primært .NET/C#-utviklere med bakgrunn i WPF og MVVM. Kjent med objektorientert tenking, databinding og lag-arkitektur — men lite erfaring med React og nettleser-paradigmet. Bruk dette aktivt: komponenter ≈ views, state ≈ viewmodel, props ≈ databinding.

---

## Dagoversikt

| Tid   | Sesjon                                                                       |
| ----- | ---------------------------------------------------------------------------- |
| 09:00 | Intro: Tenke web                                                             |
| 09:30 | Oppsett                                                                      |
| 10:15 | **Modul 1: Arkitektur og Gjenbruk** — fix struktur → bygg komponentbibliotek |
| 11:15 | **Modul 2: Routing** + Next.js demo                                          |
| 12:00 | Lunsj                                                                        |
| 13:00 | **Modul 3: State og Effects**                                                |
| 13:45 | **Modul 4: TanStack Query**                                                  |
| 14:30 | Pause                                                                        |
| 14:45 | **Modul 5: Skjema**                                                          |
| 15:40 | Avslutning + sertifiseringspitch                                             |

---

## Agenda

### 09:00 — Intro: Tenke web

_Format: Slides_

- CSR vs SSR, hydration og ytelse
- Latency, loading states og race conditions — vi ser på problemene _før_ vi løser dem
- Kort ærlig oversikt over Next.js, Server Components, RSC
  - _"Vi holder eget kurs om server-side React — i dag fokuserer vi på SPA og client-side best practices"_
- Hva vi skal bygge i dag

### 09:30 — Oppsett

_Format: Demo + codealong_

> **NB:** 40 personer på delt WiFi — be dem klone på forhånd.

**Sett opp repo**

- README.md: vis `npm install`, `npm run db:seed`, `npm run dev` — kjør sammen og verifiser at alt kjører
- Vis portene: Arena på `localhost:5173`, API på `localhost:3001` (Scalar-docs på rot), klinikk.no på `localhost:3000`
- Turbo dev: vis at alle apper starter parallelt med én kommando — forklar monorepo-konseptet kort
- ESLint og Prettier: vis config, vis at feil markeres i editoren, vis at format on save fungerer — sjekk at alle har det oppe
- TypeScript strict mode: typer for props, hendelser og API-svar. Spør: hva kjenner dere igjen fra C#? (Interfaces ≈ typer, generics, nullable)
- React Compiler: skrudd på som standard — den memoizerer automatisk, dere trenger ikke `useMemo`/`useCallback` manuelt. Vi lar den stå på og stoler på den.
- Vitest + React Testing Library: pre-konfigurert og klart, men vi bruker det ikke aktivt i dag — det er der og det er satt opp riktig
- AI-oppsett: GitHub Copilot aktivert, `copilot-instructions.md` peker til `AGENTS.md`, `/react-best-practices`-skill er tilgjengelig som slash-kommando i chat

**Gå gjennom repo-strukturen**

- `apps/arena/` — React Router v7 SPA, journalsystem, dette er appen vi jobber i hele dagen
  - Vis `src/` — per nå er det ganske flatt, vi fikser det i Modul 1
  - Vis `main.tsx`: `QueryClientProvider`, `<BrowserRouter>` — to providers, alt starter her
  - Kjør appen og vis journalsystemet live: pasientliste, klikk inn på en pasient, journaloppføringer
- `apps/api/` — Hono API, ferdigskrevet, deltakere trenger ikke røre den
  - Vis `src/routes/` — to filer, `patients.ts` og `journals.ts`, OpenAPI-rutere via `@hono/zod-openapi`
  - Vis `src/db/schema.ts` — Drizzle-schema, to tabeller: `patients` og `journals`
  - `npm run db:seed` tilbakestiller til original seed-data hvis noe går galt
  - Åpne `http://localhost:3001/` — Scalar-docs UI, klikk gjennom endepunktene live
- `apps/klinikk.no/` — Next.js markedsføringsside, bruker `packages/ui`
  - Kort: dette er her for å demonstrere forskjellen mellom SPA og server-side rendering — vi kommer tilbake til det i Modul 2
- `packages/ui/` — delt komponentbibliotek (`@klinikk/ui`)
  - Vis `src/base/` — generiske shadcn-primitives (`Badge`, `Button`, `Card`, `Input`, `Label`, `Select`, `Textarea`) hentet inn fra shadcn CLI
  - Vis `src/StatusBadge.tsx` — domenespesifikk wrapper rundt `<Badge>` som mapper `JournalStatus` til farge og label
  - Eksporter via `src/index.ts`. Begge apper importerer fra `@klinikk/ui` — endring ett sted, alle apper oppdateres
  - Vi bygger på dette i Modul 1

### 10:15 — Modul 1: Arkitektur og Gjenbruk

_Format: Fix it + Build it_

**Teori (5 min):** Feature-basert struktur, komponentansvar, Error Boundary-plassering. Deltakerne er vant til store klasser med mye ansvar — i React er målet små, fokuserte komponenter, og mappestrukturen bør reflektere hva appen _gjør_, ikke hva slags fil det er.

**Utgangspunkt:** Alt ligger flatt i `src/` — én stor `App.tsx`, ingen feature-inndeling, status-styling duplisert som inline klassenavn.

**Individuell koding (15 min):**

_Fix it: Struktur_

1. Flytt filer inn i feature-mapper:
   - `src/features/patients/` — pasientliste, pasientkort, pasientheader
   - `src/features/journal/` — journalvisning, journaloppføring
   - `src/components/` — delte UI-komponenter
2. Bryt opp `PatientPage.tsx` (stor monolitt) i `PatientList`, `PatientCard`, `PatientHeader`
3. Legg til en `<ErrorBoundary>` i `Layout` rundt `<Outlet>` — kast en feil manuelt og se at den fanges

_Build it: Gjenbruk_

4. Se på `packages/ui/src/base/` — generiske shadcn-primitives (`Badge`, `Button`, `Card`, `Input`, `Select`)
5. Bygg en domenespesifikk `<StatusBadge>` som wrapper `<Badge>` fra base og mapper `JournalStatus` (`aktiv` / `avsluttet` / `utkast`) til riktig variant og label — plasser den i `packages/ui/src/StatusBadge.tsx`
6. Eksporter den fra `packages/ui/src/index.ts`
7. Importer og bruk den i både `arena` og `klinikk.no` — endre fargen på én status og se at begge apper oppdateres

**Gruppediskusjon (10 min):** Hva skilte dere ut? Hva var vanskelig å avgjøre?

**Felles gjennomgang (10 min):** Live-code fasit, vis komponent i begge apper

- _To-lags komponentbibliotek:_ `base/` er generiske shadcn-primitives (`Badge`, `Button`, `Card`...) — selve roten. På toppen bygger vi domenespesifikke wrappers som `<StatusBadge>` som kjenner forretningslogikken (`aktiv` → grønn). Appene bruker wrapperne, ikke primitivene direkte når det finnes domenebegrep — én endring i mapping og hele systemet følger med.
- _Komponentbibliotek:_ Ett definisjonspunkt, brukes i alle apper — endre én farge og begge apper oppdateres. WPF-analogi: `ResourceDictionary` / `Style`. Trenger ikke publiseres til npm — workspace-pakken er nok.
- _Hvorfor ikke skrive alt selv?_ Universell utforming er lovpålagt i helsetjenesten og genuint vanskelig: riktig `<Dialog>` krever focus-trap, `aria-modal`, scroll-lock, Escape-håndtering. DIPS har et internt designsystem som sannsynligvis håndterer dette — finn ut hva det bruker under panseret og bruk det.

_Kort nevnt:_ Supply chain-risiko — nå som dere vet hvor enkelt det er å lage en pakke, hvor enkelt er det å snike inn malicious code? `npm audit` og lockfiles på to minutter.

### 11:15 — Modul 2: Routing

_Format: Fix it + demo_

**Teori (5 min):** Fordeler med client-side routing — ingen full reload, bookmark-støtte, tilstandsbevaring på tvers av navigasjon, URL som single source of truth. `<BrowserRouter>` + `<Routes>` deklarativt, nested routes med `<Outlet>`, React Router v7 vs Next.js `app/`. Latency under navigasjon — hva viser du brukeren mens neste side laster? Deltakerne er vant til navigasjon uten URL — i React er URL-en alltid synkronisert med hva brukeren ser, kan deles og bokmerkes.

**Utgangspunkt:** Navigasjon med `window.location.href`, betinget rendering i `App.tsx`, ingen React Router.

**Individuell koding (15 min):**

1. Wrap appen i `<BrowserRouter>` i `main.tsx`
2. Sett opp ruter med `<Routes>` og `<Route>` i en egen `AppRoutes`-komponent:
   - `/` — dashboard
   - `/pasienter` — pasientliste
   - `/pasienter/:id` — pasientdetalj
3. Bruk en delt `<Layout>` med `<Outlet>` som forelder-rute
4. Bytt hardkodede `<a href>`-lenker til `<Link>` og `<NavLink>` i sidebar
5. Les `:id` med `useParams` i pasientdetalj-siden og bruk den til å hente riktig pasient

**Gruppediskusjon (10 min):** Hva er forskjellen på en SPA-router og filbasert routing i et framework?

**Felles gjennomgang + demo (10 min):** Live-code fasit, åpne `apps/klinikk.no/` — vis `app/`-struktur, `page.tsx`, `loading.tsx`, `layout.tsx`. _"Hva er likt? Hva er annerledes? Og hvorfor passer Next.js bedre her enn i Arena?"_

### 12:00 — Lunsj

### 13:00 — Modul 3: State og Effects

_Format: Fix it_

**Teori (5 min):** Rules of React, derived state, når `useEffect` er feil verktøy. Deltakerne er vant til å trigge logikk fra events og property-setters — i React er komponenter rene funksjoner, side-effekter håndteres eksplisitt, og det som kan beregnes bør ikke lagres.

**Utgangspunkt:** Flere `useEffect`-anti-patterns spredt i komponenter — `setState` inne i `useEffect`, duplisert logikk på tvers av komponenter, overflødig state.

**Individuell koding (15 min):**

1. Finn og fjern `useEffect` som setter state basert på annen state — beregn derived state direkte i render i stedet
2. Finn og fjern `useEffect` som synkroniserer to state-verdier — slå dem sammen til én kilde
3. Trekk ut søke- og filterlogikk som går igjen i to komponenter til en felles `usePatientFilter`-hook

**Gruppediskusjon (10 min):** Når er `useEffect` riktig? Hva skulle du brukt i stedet?

**Felles gjennomgang (10 min):** Live-code fasit, nevn `useRef` kort som en annen escape hatch — mutable verdier som ikke skal trigge re-render, eller direkte DOM-tilgang

### 13:45 — Modul 4: TanStack Query

_Format: Fix it_

**Teori (5 min):** Tilbake til introen — latency, loading states og race conditions. Hva skjer egentlig når du fetch-er data i en komponent? Hva caching gir deg, og hvordan TanStack Query løser problemene vi så på starten av dagen. Deltakerne er vant til å skrive async-infrastruktur selv (loading-flagg, try/catch, cancel-logikk) — målet er å vise hva de får gratis.

**Utgangspunkt:** Data hentes med `useEffect` + `fetch` + manuell `isLoading`-boolean. Ingen caching, ingen race condition-håndtering.

**Individuell koding (15 min):**

1. Erstatt `useEffect`-fetching av pasientliste med `useQuery`
   - Legg til loading state (spinner/skeleton)
   - Legg til error state
2. Erstatt `useEffect`-fetching av enkeltpasient med `useSuspenseQuery`
   - Koble til `<ErrorBoundary>` fra Modul 1 og en lokal `<Suspense>`
   - Se at siden suspender mens data lastes
3. Legg til `useMutation` for å oppdatere journalstatus
   - Invalider relevant query etter vellykket mutation så listen oppdateres automatisk

**Gruppediskusjon (10 min):** Hva skjer med race conditions nå? Hva fikk dere gratis fra cachen?

**Felles gjennomgang (10 min):** Live-code fasit, vis bakgrunnsoppdatering og devtools

### 14:30 — Pause

### 14:45 — Modul 5: Skjema

_Format: Fix it_

**Teori (5 min):** Kontrollerte vs ukontrollerte inputs, hvorfor skjemavalidering hører hjemme i schema, ikke i komponenten. Deltakerne er vant til sterk validering på server-siden — Zod gir samme trygghet på klienten.

**Utgangspunkt:** Et ukontrollert `<form>` med `onSubmit` som leser fra `event.target`. Ingen validering, manuell error-state.

**Individuell koding (15 min):**

1. Koble skjemaet til `useForm()` fra React Hook Form
2. Skriv et Zod-schema for ny journaloppføring:
   - Tittel: påkrevd, maks 100 tegn
   - Dato: påkrevd
   - Innhold: påkrevd, minimum 10 tegn
3. Koble Zod-schema til React Hook Form med `zodResolver`
4. Vis inline feilmeldinger under hvert felt
5. Send data til API med `useMutation` — vis server-feilmelding hvis requesten feiler

**Gruppediskusjon (10 min):** Hva skjer når serveren returnerer feil? Hvordan håndterer dere det?

**Felles gjennomgang (10 min):** Live-code fasit, vis full submit-flyt mot API

- _NB:_ API-en validerer også innkommende data med Zod — nevn dette eksplisitt: klientvalidering er for UX, servervalidering er for sikkerhet.

### 15:40 — Avslutning _(20 min)_

_Format: Slides_

- Hva vi dekket i dag
- Hva som er igjen i curriculum — TypeScript dybde, testing, Zustand, Context, sikkerhet
- React-sertifisering: læringssti, hva testes, lenker

---

## Gjenstående å gjøre

- [x] Bygg ferdig versjon (`dips-workshop`): monorepo med `apps/arena/`, `apps/api/`, `apps/klinikk.no/`, `packages/ui/`
- [x] Skriv Hono API med endepunkter for pasienter og journaloppføringer (OpenAPI + Scalar-docs)
- [x] Sett opp SQLite + Drizzle med seed-data + `npm run db:seed` reset-script
- [x] Konfigurer ESLint, Prettier, `copilot-instructions.md` i ferdig versjon
- [x] Sett opp Vitest + RTL pre-konfigurert (ikke i bruk i dag, men klart)
- [x] Test at `turbo dev` fungerer på en fersk klone (macOS — og Windows hvis aktuelt)
- [ ] Lag starter-versjon (`dips-workshop-starter`): introduser bevisste feil og TODOs per modul
- [x] Skriv oppgavebeskrivelser — se [tasks.md](tasks.md)
- [ ] Lag slides (intro, modul-intros, avslutning)
- [ ] Gjennomfør solo dry-run av hele workshopen
