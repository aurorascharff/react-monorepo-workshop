# Step 3: State and Effects


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

