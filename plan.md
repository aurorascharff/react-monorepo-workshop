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

| Kategori | Valg |
|---|---|
| Rammeverk | React Router v7 (SPA) |
| Backend | Hono (pre-skrevet, kjører lokalt) |
| Database | SQLite + Drizzle ORM |
| Monorepo | Turborepo |
| Styling | Tailwind CSS + shadcn/ui |
| Data | TanStack Query |
| Skjema | React Hook Form + Zod |
| Tooling | ESLint, Prettier, TypeScript |
| Testing | Vitest + React Testing Library (pre-konfigurert) |
| AI | GitHub Copilot + `copilot-instructions.md` + agent skills |

**Repos:**
- `dips-workshop` — ferdig løsning (bygges først)
- `dips-workshop-starter` — utgangspunkt for deltakere (lages fra ferdig versjon ved å introdusere bevisste feil og TODOs)

**Repo-struktur:**
```
apps/
  arena/        ← React Router v7 SPA (journalsystem — workshop-appen)
  api/          ← Hono API (pre-skrevet, REST-endepunkter for pasienter og journaler)
  dips.no/      ← Next.js (markedsføringsside — SSR, SEO, statisk innhold)
packages/
  ui/           ← delt komponentbibliotek (shadcn-base + custom)
```

`turbo dev` starter alle apper parallelt. API-en er ferdigskrevet — deltakere trenger ikke røre den, men kan lese og forstå den. SQLite-fil er inkludert i repo med seed-data (pasienter, journaloppføringer).

**App-domene:** `arena/` er et journalsystem inspirert av DIPS Arena — pasientliste, journaloppføringer, skjemaer. `dips.no/` er en enkel markedsføringsside som bruker komponenter fra `packages/ui` og demonstrerer hvorfor Next.js gir mening for innholdsrike, offentlige sider (SEO, statisk generering, SSR).

**Deltakerbakgrunn:** Primært .NET/C#-utviklere med bakgrunn i WPF og MVVM. Kjent med objektorientert tenking, databinding og lag-arkitektur — men lite erfaring med React og nettleser-paradigmet. Bruk dette aktivt: komponenter ≈ views, state ≈ viewmodel, props ≈ databinding.

---

## Dagoversikt

| Tid | Sesjon |
|---|---|
| 09:00 | Intro: Tenke web |
| 09:30 | Oppsett |
| 10:15 | **Modul 1: Arkitektur og Gjenbruk** — fix struktur → bygg komponentbibliotek |
| 11:15 | **Modul 2: Routing** + Next.js demo |
| 12:00 | Lunsj |
| 13:00 | **Modul 3: State og Effects** |
| 13:45 | **Modul 4: TanStack Query** |
| 14:30 | Pause |
| 14:45 | **Modul 5: Skjema** |
| 15:40 | Avslutning + sertifiseringspitch |

---

## Agenda

### 09:00 — Intro: Tenke web
*Format: Slides*

- CSR vs SSR, hydration og ytelse
- Latency, loading states og race conditions — vi ser på problemene *før* vi løser dem
- Kort ærlig oversikt over Next.js, Server Components, RSC
  - *"Vi holder eget kurs om server-side React — i dag fokuserer vi på SPA og client-side best practices"*
- Hva vi skal bygge i dag

### 09:30 — Oppsett
*Format: Demo + codealong*

> **NB:** 40 personer på delt WiFi — be dem klone på forhånd.

**Sett opp repo**

- README.md: vis `npm install`, `npm run db:seed`, `npm run dev` — kjør sammen og verifiser at alt kjører
- Vis portene: Arena på `localhost:5173`, API på `localhost:3001`, dips.no på `localhost:3000`
- Turbo dev: vis at alle apper starter parallelt med én kommando — forklar monorepo-konseptet kort
- ESLint og Prettier: vis config, vis at feil markeres i editoren, vis at format on save fungerer — sjekk at alle har det oppe
- TypeScript strict mode: typer for props, hendelser og API-svar. Spør: hva kjenner dere igjen fra C#? (Interfaces ≈ typer, generics, nullable)
- React Compiler: skrudd på som standard — den memoizerer automatisk, dere trenger ikke `useMemo`/`useCallback` manuelt. Vi lar den stå på og stoler på den.
- Vitest + React Testing Library: pre-konfigurert og klart, men vi bruker det ikke aktivt i dag — det er der og det er satt opp riktig
- AI-oppsett: GitHub Copilot aktivert, `copilot-instructions.md` peker til `AGENTS.md`, `/react-best-practices`-skill er tilgjengelig som slash-kommando i chat

**Gå gjennom repo-strukturen**

- `apps/arena/` — React Router v7 SPA, journalsystem, dette er appen vi jobber i hele dagen
  - Vis `src/` — per nå er det ganske flatt, vi fikser det i Modul 1
  - Vis `main.tsx`: `QueryClientProvider`, `RouterProvider` — to providers, alt starter her
  - Kjør appen og vis journalsystemet live: pasientliste, klikk inn på en pasient, journaloppføringer
- `apps/api/` — Hono API, ferdigskrevet, deltakere trenger ikke røre den
  - Vis `src/routes/` — to filer, `patients.ts` og `journals.ts`, enkle REST-endepunkter
  - Vis `src/db/schema.ts` — Drizzle-schema, to tabeller: `patients` og `journals`
  - `npm run db:seed` tilbakestiller til original seed-data hvis noe går galt
  - Vis `GET /patients` i nettleser eller Postman så de ser JSON-responsen
- `apps/dips.no/` — Next.js markedsføringsside, bruker `packages/ui`
  - Kort: dette er her for å demonstrere forskjellen mellom SPA og server-side rendering — vi kommer tilbake til det i Modul 2
- `packages/ui/` — delt komponentbibliotek
  - Vis `src/StatusBadge.tsx` og `src/index.ts` — én komponent eksportert herfra
  - Begge apper importerer fra `@dips/ui` — endring ett sted, alle apper oppdateres
  - Vi bygger på dette i Modul 1

### 10:15 — Modul 1: Arkitektur og Gjenbruk
*Format: Fix it + Build it*

**Teori (5 min):** Feature-basert struktur, komponentansvar, Error Boundary-plassering. Deltakerne er vant til store klasser med mye ansvar — i React er målet små, fokuserte komponenter, og mappestrukturen bør reflektere hva appen *gjør*, ikke hva slags fil det er.

**Individuell koding (15 min):**
- Fix it: flat mappestruktur → feature-basert, bryt opp store komponenter, legg til Error Boundary
- Build it: ta `<StatusBadge>` ut i `packages/ui`, importer den i begge apper

*Feil i codebase:* Flat mappestruktur, store komponenter som gjør for mye, ingen feature-inndeling

**Gruppediskusjon (10 min):** Hva skilte dere ut? Hva var vanskelig å avgjøre?

**Felles gjennomgang (10 min):** Live-code fasit, vis komponent i begge apper
- *Komponentbibliotek:* Ett definisjonspunkt, brukes i alle apper — endre én farge og begge apper oppdateres. WPF-analogi: `ResourceDictionary` / `Style`. Trenger ikke publiseres til npm — workspace-pakken er nok.
- *Hvorfor ikke skrive alt selv?* Universell utforming er lovpålagt i helsetjenesten og genuint vanskelig: riktig `<Dialog>` krever focus-trap, `aria-modal`, scroll-lock, Escape-håndtering. DIPS har et internt designsystem som sannsynligvis håndterer dette — finn ut hva det bruker under panseret og bruk det.

*Kort nevnt:* Supply chain-risiko — nå som dere vet hvor enkelt det er å lage en pakke, hvor enkelt er det å snike inn malicious code? `npm audit` og lockfiles på to minutter.

### 11:15 — Modul 2: Routing
*Format: Fix it + demo*

**Teori (5 min):** Fordeler med client-side routing — ingen full reload, bookmark-støtte, tilstandsbevaring på tvers av navigasjon, URL som single source of truth. Fil-basert routing, nested routes, React Router v7 vs Next.js `app/`. Latency under navigasjon — hva viser du brukeren mens neste side laster? Deltakerne er vant til navigasjon uten URL — i React er URL-en alltid synkronisert med hva brukeren ser, kan deles og bokmerkes.

**Individuell koding (15 min):**
- Erstatt manuell navigasjonslogikk med React Router-komponenter
- Sett opp nested routes og layouts
- Bruk `useParams` og `useNavigate` der det trengs

*Feil i codebase:* Manuell navigasjonslogikk, hardkodede stier, ingen nested routes

**Gruppediskusjon (10 min):** Hva er forskjellen på en SPA-router og filbasert routing i et framework?

**Felles gjennomgang + demo (10 min):** Live-code fasit, åpne `apps/dips.no/` — vis `app/`-struktur, `page.tsx`, `loading.tsx`, `layout.tsx`. *"Hva er likt? Hva er annerledes? Og hvorfor passer Next.js bedre her enn i Arena?"*

### 12:00 — Lunsj

### 13:00 — Modul 3: State og Effects
*Format: Fix it*

**Teori (5 min):** Rules of React, derived state, når `useEffect` er feil verktøy. Deltakerne er vant til å trigge logikk fra events og property-setters — i React er komponenter rene funksjoner, side-effekter håndteres eksplisitt, og det som kan beregnes bør ikke lagres.

**Individuell koding (15 min):**
- Fjern `setState` kalt inne i `useEffect`
- Erstatt duplisert logikk med custom hooks
- Beregn derived state direkte i render i stedet for å lagre den

*Feil i codebase:* `setState` kalt inne i `useEffect`, duplisert logikk på tvers av komponenter, overflødig state

**Gruppediskusjon (10 min):** Når er `useEffect` riktig? Hva skulle du brukt i stedet?

**Felles gjennomgang (10 min):** Live-code fasit, nevn `useRef` kort som en annen escape hatch — mutable verdier som ikke skal trigge re-render, eller direkte DOM-tilgang

### 13:45 — Modul 4: TanStack Query
*Format: Fix it*

**Teori (5 min):** Tilbake til introen — latency, loading states og race conditions. Hva skjer egentlig når du fetch-er data i en komponent? Hva caching gir deg, og hvordan TanStack Query løser problemene vi så på starten av dagen. Deltakerne er vant til å skrive async-infrastruktur selv (loading-flagg, try/catch, cancel-logikk) — målet er å vise hva de får gratis.

**Individuell koding (15 min):**
- Erstatt `useEffect`-datafetching med `useQuery` / `useSuspenseQuery`
- Legg til loading state og error state
- Kombiner med Error Boundary fra Modul 1

*Feil i codebase:* `useEffect`-basert datafetching uten loading/error-håndtering, ingen caching

**Gruppediskusjon (10 min):** Hva skjer med race conditions nå? Hva fikk dere gratis fra cachen?

**Felles gjennomgang (10 min):** Live-code fasit, vis bakgrunnsoppdatering og devtools

### 14:30 — Pause

### 14:45 — Modul 5: Skjema
*Format: Fix it*

**Teori (5 min):** Kontrollerte vs ukontrollerte inputs, hvorfor skjemavalidering hører hjemme i schema, ikke i komponenten. Deltakerne er vant til sterk validering på server-siden — Zod gir samme trygghet på klienten.

**Individuell koding (15 min):**
- Koble skjema til React Hook Form
- Legg til Zod-schema for validering
- Vis feilmeldinger og håndter server-respons

*Feil i codebase:* Ukontrollert skjema uten validering, manuell error-state

**Gruppediskusjon (10 min):** Hva skjer når serveren returnerer feil? Hvordan håndterer dere det?

**Felles gjennomgang (10 min):** Live-code fasit, vis full submit-flyt mot API
- *NB:* API-en validerer også innkommende data med Zod — nevn dette eksplisitt: klientvalidering er for UX, servervalidering er for sikkerhet.

### 15:40 — Avslutning *(20 min)*
*Format: Slides*

- Hva vi dekket i dag
- Hva som er igjen i curriculum — TypeScript dybde, testing, Zustand, Context, sikkerhet
- React-sertifisering: læringssti, hva testes, lenker

---

## Gjenstående å gjøre

- [ ] Bygg ferdig versjon (`dips-workshop`): monorepo med `apps/arena/`, `apps/api/`, `apps/dips.no/`, `packages/ui/`
- [ ] Skriv Hono API med endepunkter for pasienter og journaloppføringer
- [ ] Sett opp SQLite + Drizzle med seed-data + `npm run db:seed` reset-script
- [ ] Konfigurer ESLint, Prettier, Vitest, `copilot-instructions.md` i ferdig versjon
- [ ] Test at `turbo dev` fungerer på en fersk klone (macOS — og Windows hvis aktuelt)
- [ ] Lag starter-versjon (`dips-workshop-starter`): introduser bevisste feil og TODOs per modul
- [x] Skriv oppgavebeskrivelser — se [tasks.md](tasks.md)
- [ ] Lag slides (intro, modul-intros, avslutning)
- [ ] Gjennomfør solo dry-run av hele workshopen
