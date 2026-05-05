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

- Klon repo og monorepo-struktur
- Gjennomgang av tooling: ESLint, Prettier, TypeScript-config
- React Compiler er skrudd på — hva det gjør og hvorfor vi lar det stå på
- AI-oppsett: GitHub Copilot, `copilot-instructions.md`, agent skills og React best practices
- Kjør appen — se journalsystemet

### 10:15 — Modul 1: Arkitektur
*Format: Fix it*

- Feature-basert mappestruktur
- Komponentansvar og gjenbruk
- Prosjektkonvensjoner: filnavn, eksporter, mappestruktur

*Feil i codebase:* Flat mappestruktur, store komponenter som gjør for mye, ingen feature-inndeling

### 11:00 — Modul 2: Routing
*Format: Fix it + demo*

- Fil-basert routing i React Router v7
- Nested routes og layouts
- Link, NavLink, useParams, useNavigate

*Feil i codebase:* Manuell navigasjonslogikk, hardkodede stier, ingen nested routes

*Demo:* Åpne `apps/dips.no/` — vis `app/`-struktur, `page.tsx`, `loading.tsx`, `layout.tsx`, Server Components som henter data direkte. *"Hva er likt? Hva er annerledes? Og hvorfor passer Next.js bedre her enn i Arena?"*

### 11:45 — Modul 3: Komponentbibliotek + Supply Chain
*Format: Exercise + diskusjon*

- Lag en komponent i `packages/ui` (f.eks. `<StatusBadge>`)
- Se at den dukker opp i begge apper — endre ett sted, alle steder endres
- Kollega skal kunne importere og bruke den

*Diskusjon:* Supply chain-risiko — hvor enkelt er det å snike inn malicious code i en npm-pakke? Live-demo av et minimalt eksempel. `npm audit`, lockfiles, scoped packages.

### 12:30 — Lunsj

### 13:15 — Modul 4: State og Effects
*Format: Fix it*

- Rules of React — renhet, idempotens, ingen sideeffekter i render
- Derived state — ikke lagre det som kan beregnes
- Når `useEffect` er feil verktøy
- Custom hooks — trekk ut gjenbrukbar logikk
- `useRef` og hva det faktisk løser

*Feil i codebase:* `setState` kalt inne i `useEffect`, duplisert logikk på tvers av komponenter, overflødig state

### 14:00 — Modul 5: TanStack Query
*Format: Fix it*

- Caching og bakgrunnsoppdatering
- Loading states og error states
- `useSuspenseQuery` og Error Boundary
- Race conditions — hvorfor de oppstår og hvordan unngå dem

*Feil i codebase:* `useEffect`-basert datafetching uten loading/error-håndtering, ingen caching

### 14:45 — Pause

### 15:00 — Modul 6: Skjema
*Format: Fix it*

- Kontrollerte vs ukontrollerte inputs
- React Hook Form + Zod
- Validering og feilhåndtering
- Server-kommunikasjon fra skjema

*Feil i codebase:* Ukontrollert skjema uten validering, manuell error-state

### 15:40 — Avslutning
*Format: Slides*

- Hva vi dekket i dag
- Hva som er igjen i curriculum — TypeScript dybde, testing, Zustand, Context, sikkerhet
- React-sertifisering: læringssti, hva testes, lenker

---

## Gjenstående å gjøre

- [ ] Bygg ferdig versjon (`dips-workshop`): monorepo med `apps/arena/`, `apps/api/`, `apps/dips.no/`, `packages/ui/`
- [ ] Skriv Hono API med endepunkter for pasienter og journaloppføringer
- [ ] Sett opp SQLite + Drizzle med seed-data
- [ ] Konfigurer ESLint, Prettier, Vitest, `copilot-instructions.md` i ferdig versjon
- [ ] Lag starter-versjon (`dips-workshop-starter`): introduser bevisste feil og TODOs per modul
- [ ] Skriv oppgavebeskrivelser (task descriptions) med klare TODOs og akseptansekriterier
- [ ] Lag slides (intro, modul-intros, avslutning)
- [ ] Oppdater `prereqs.md` med repo-URL når klar
- [ ] Gjennomfør solo dry-run av hele workshopen
