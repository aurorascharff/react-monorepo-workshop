# Step 3: State and Effects

## English

## App: Frame the problem

- Open the code that stores values we can calculate.
- `useEffect` is not bad. The problem is using it to synchronize React state with other React state.
- What is `useEffect` for?
- The point I want to land: synchronize with systems outside React, like network, timers, subscriptions, browser APIs, or third-party widgets.
- Data-fetching effects stay for now. Those belong to Module 4.

## App: Remove derived dashboard state

- Open `apps/arena/src/pages/DashboardPage.tsx`.
- Find the stats state.
- Can `total`, `female`, and `male` be calculated from `patients`?
- Remove the effect that updates stats from patients.
- Compute `total`, `female`, and `male` directly during render.
- Derived state is data we can calculate from props or existing state. If we store it too, we create two sources of truth.
- `useMemo` only briefly: start with normal render calculation. Reach for `useMemo` when the calculation is expensive or identity matters.

## App: Remove selected patient sync

- Find the component that stores both `selectedId` and `selectedPatient`.
- What can go wrong if these disagree?
- Keep `selectedId`.
- Derive `selectedPatient` from `patients.find((patient) => patient.id === selectedId) ?? null`.
- Remove the effect that synchronizes the two values.
- This makes impossible states harder to represent. The selected patient cannot disagree with the selected id.

## App: Extract usePatientFilter

- Open `PatientList`.
- `search`, `genderFilter`, and `filteredPatients`.
- Is this UI state, domain logic, or reusable component logic?
- Create `features/patients/hooks/usePatientFilter.ts`.
- Move `search`, `setSearch`, `genderFilter`, `setGenderFilter`, and `filteredPatients` into the hook.
- Return the values the component needs.
- Use `usePatientFilter(patients)` in `PatientList`.
- Custom hook: a function that uses React hooks. It is not a service class. It is reusable component logic.

## App: Add useDebounce

- Create `hooks/useDebounce.ts`.
- Store the debounced value in state.
- Use `setTimeout` in an effect.
- Clear the timeout in the effect cleanup.
- Use the debounced search value inside `usePatientFilter`.
- Why is this effect okay when the previous ones were not?
- The answers I want to draw out: We are synchronizing with a timer, which is outside React.
- The data set is tiny. Debounce is here because the pattern is common and testable, not because this app needs performance tuning.

## App: Add tests

- Add or open `usePatientFilter.test.ts`.
- Add or open `useDebounce.test.ts`.
- Use fake timers for debounce tests.
- Wrap timer advancement in `act()`.
- These tests appear now because the hooks now exist. We are not revealing future modules in the starter.

## Check

- Run `npm test --workspace=apps/arena -- --run`.
- If fake timers fail, check `act()` and cleanup first.

## Norsk

## App: Frame problemet

- Åpne kode som lagrer values vi kan beregne.
- `useEffect` er ikke dårlig. Problemet er å bruke den til å synchronisere React state med annen React state.
- Hva er `useEffect` egentlig for?
- Svarene jeg vil få frem: synchronize med systemer utenfor React, som network, timers, subscriptions, browser APIs eller third-party widgets.
- Data-fetching effects blir stående for nå. De hører til Module 4.

## App: Remove derived dashboard state

- Åpne `apps/arena/src/pages/DashboardPage.tsx`.
- Finn stats state.
- Kan `total`, `female` og `male` beregnes fra `patients`?
- Fjern effect-en som oppdaterer stats fra patients.
- Beregn `total`, `female` og `male` direkte under render.
- Derived state er data vi kan beregne fra props eller eksisterende state. Hvis vi lagrer det også, lager vi two sources of truth.
- `useMemo` kort: start med vanlig render calculation. Bruk `useMemo` når calculation er dyr eller identity betyr noe.

## App: Remove selected patient sync

- Finn component-en som lagrer både `selectedId` og `selectedPatient`.
- Hva kan gå galt hvis disse er uenige?
- Behold `selectedId`.
- Derive `selectedPatient` fra `patients.find((patient) => patient.id === selectedId) ?? null`.
- Fjern effect-en som synchronizer de to verdiene.
- Dette gjør impossible states vanskeligere å representere. Selected patient kan ikke være uenig med selected id.

## App: Extract usePatientFilter

- Åpne `PatientList`.
- `search`, `genderFilter` og `filteredPatients`.
- Er dette UI state, domain logic eller reusable component logic?
- Lag `features/patients/hooks/usePatientFilter.ts`.
- Flytt `search`, `setSearch`, `genderFilter`, `setGenderFilter` og `filteredPatients` inn i hook-en.
- Returner verdiene component-en trenger.
- Bruk `usePatientFilter(patients)` i `PatientList`.
- Custom hook: en function som bruker React hooks. Det er ikke en service class. Det er reusable component logic.

## App: Add useDebounce

- Lag `hooks/useDebounce.ts`.
- Lagre debounced value i state.
- Bruk `setTimeout` i en effect.
- Rydd opp timeout i effect cleanup.
- Bruk debounced search value inne i `usePatientFilter`.
- Hvorfor er denne effect-en grei når de forrige ikke var det?
- Svarene jeg vil få frem: Vi synchronizer med en timer, som er utenfor React.
- Data set-et er lite. Debounce er her fordi pattern-en er vanlig og testbar, ikke fordi denne appen trenger performance tuning.

## App: Add tests

- Legg til eller åpne `usePatientFilter.test.ts`.
- Legg til eller åpne `useDebounce.test.ts`.
- Bruk fake timers for debounce tests.
- Wrap timer advancement i `act()`.
- Disse testene kommer nå fordi hooks finnes nå. Vi avslører ikke future modules i starter.

## Check

- Kjør `npm test --workspace=apps/arena -- --run`.
- Hvis fake timers feiler, sjekk `act()` og cleanup først.
