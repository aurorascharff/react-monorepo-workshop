# Oppgaver per modul

Alle oppgaver gjøres i `apps/arena/` med utgangspunkt i starter-codebase.  
Fasit finnes i `dips-workshop` (ferdig versjon).

---

## Modul 1 — Arkitektur og Gjenbruk

**Utgangspunkt:** Alt ligger i `src/` — én stor `App.tsx`, flat komponentmappe, ingen feature-inndeling.

### Fix it: Struktur

1. Flytt filer inn i feature-mapper:
   - `src/features/patients/` — pasientliste, pasientkort, pasientheader
   - `src/features/journal/` — journalvisning, journaloppføring
   - `src/components/` — delte UI-komponenter
2. Bryt opp `PatientPage.tsx` (stor monolitt) i `PatientList`, `PatientCard`, `PatientHeader`
3. Legg til en `<ErrorBoundary>` rundt pasientlisten — kast en feil manuelt og se at den fanges

### Build it: Gjenbruk

4. Se på `packages/ui/src/base/` — generiske shadcn-primitives (`Badge`, `Button`, `Card`, `Input`, `Select`)
5. Bygg en domenespesifikk `<StatusBadge>` som wrapper `<Badge>` fra base og mapper `JournalStatus` (`aktiv` / `avsluttet` / `utkast`) til riktig variant og label — plasser den i `packages/ui/src/StatusBadge.tsx`
6. Eksporter den fra `packages/ui/src/index.ts`
7. Importer og bruk den i begge apper — endre fargen på én status og se at begge apper oppdateres

**Akseptansekriterier:**

- Ingen komponent er ansvarlig for mer enn én ting
- `<StatusBadge>` er bygget på toppen av `<Badge>`-primitiven, ikke fra grunnen
- Domenelogikk (status → farge/label) bor i `<StatusBadge>`, ikke spredt i appene
- En kastet feil i pasientlisten krasjer ikke hele appen

---

## Modul 2 — Routing

**Utgangspunkt:** Navigasjon med `window.location.href`, betinget rendering i `App.tsx`, ingen React Router.

### Oppgaver

1. Sett opp `createBrowserRouter` med ruter:
   - `/patients` — pasientliste
   - `/patients/:id` — pasientdetalj
   - `/journal/:id` — journaloppføring
2. Erstatt betinget rendering med `<RouterProvider>` og `<Outlet>` i layout
3. Bytt hardkodede `<a href>`-lenker til `<Link>` og `<NavLink>` i sidebar
4. Les `:id` med `useParams` i pasientdetalj-siden og bruk den til å hente riktig pasient

**Akseptansekriterier:**

- Nettleseren viser riktig URL for hver side
- Siden kan bookmerkes og lastes direkte (ikke bare via navigasjon)
- Aktiv lenke i sidebar er visuelt markert med `<NavLink>`

---

## Modul 3 — State og Effects

**Utgangspunkt:** Flere `useEffect`-anti-patterns spredt i komponenter.

### Oppgaver

1. Finn og fjern `useEffect` som setter state basert på annen state — beregn derived state direkte i render i stedet
2. Finn og fjern `useEffect` som synkroniserer to state-verdier — slå dem sammen til én kilde
3. Trekk ut søke- og filterlogikk som går igjen i to komponenter til en felles `usePatientFilter`-hook

**Akseptansekriterier:**

- Ingen `useEffect` setter state som kan beregnes fra eksisterende state
- `usePatientFilter` kan importeres og brukes i begge komponenter uten duplisering
- ESLint rapporterer ingen `react-hooks`-advarsler

---

## Modul 4 — TanStack Query

**Utgangspunkt:** Data hentes med `useEffect` + `fetch` + manuell `isLoading`-boolean. Ingen caching, ingen race condition-håndtering.

### Oppgaver

1. Erstatt `useEffect`-fetching av pasientliste med `useQuery`
   - Legg til loading state (spinner/skeleton)
   - Legg til error state
2. Erstatt `useEffect`-fetching av enkeltpasient med `useSuspenseQuery`
   - Koble til `<ErrorBoundary>` fra Modul 1
   - Se at siden suspender mens data lastes
3. Legg til `useMutation` for å oppdatere journalstatus
   - Invalider pasient-query etter vellykket mutation så listen oppdateres automatisk

**Akseptansekriterier:**

- Ingen `useEffect` brukes til datafetching
- Hurtig navigasjon frem og tilbake viser cachet data umiddelbart
- En nettverksfeil fanges av Error Boundary — appen krasjer ikke

---

## Modul 5 — Skjema

**Utgangspunkt:** Et ukontrollert `<form>` med `onSubmit` som leser fra `event.target`. Ingen validering, manuell error-state.

### Oppgaver

1. Koble skjemaet til `useForm()` fra React Hook Form
2. Skriv et Zod-schema for ny journaloppføring:
   - Tittel: påkrevd, maks 100 tegn
   - Dato: påkrevd
   - Innhold: påkrevd, minimum 10 tegn
3. Koble Zod-schema til React Hook Form med `zodResolver`
4. Vis inline feilmeldinger under hvert felt
5. Send data til API med `useMutation` — vis server-feilmelding hvis requesten feiler

**Akseptansekriterier:**

- Skjema kan ikke submittes med ugyldig data
- Feilmeldinger vises per felt, ikke som en global alert
- Vellykket submit invaliderer journal-query og viser oppdatert liste
