# Step 4: TanStack Query

## English

## App: Show manual server state

- Open the current patient and journal fetching code.
- This is server state. The API owns it, and the client displays it.
- What are we manually handling right now?
- The answers I want to draw out: Loading, errors, retries, stale data, cache, race conditions, refetching after mutations.
- TanStack Query gives us a standard way to describe server state instead of rebuilding that infrastructure in each component.

## App: Check QueryClientProvider

- Open `apps/arena/src/main.tsx`.
- Show `QueryClientProvider`.
- The `QueryClient`.
- Check `staleTime` and `retry`.
- `staleTime`: how long data is considered fresh.
- `retry`: how failed requests are retried.
- React Query Devtools if you want to show cache state during the demo.

## App: Create usePatients

- Create `features/patients/hooks/usePatients.ts`.
- Add `useQuery`.
- Use `queryKey: ['patients']`.
- Use `queryFn: fetchPatients`.
- A query key is the cache address.
- What should happen if Dashboard and Patients both ask for `['patients']`?
- The answers I want to draw out: They should reuse the same cache entry.
- Variables belong in the query key when they change the returned data.

## App: Use usePatients

- Open `pages/PatientListPage.tsx`.
- Replace local `patients`, `isLoading`, and fetching effect with `usePatients`.
- Render loading, error, and success states.
- Open `pages/DashboardPage.tsx`.
- Replace manual fetching with `usePatients`.
- Navigate between Dashboard and Patients to verify cache reuse.
- We removed duplicated fetching logic, but we also got better navigation behavior because data is cached.

## App: Fetch patient detail with useSuspenseQuery

- Open `pages/PatientDetailPage.tsx`.
- Create an inner `PatientDetail` component.
- Use `useSuspenseQuery`.
- Use `queryKey: ['patient', id]`.
- Use `queryFn` to fetch one patient by id.
- `useSuspenseQuery` does not give us `isLoading`. It suspends and lets the parent boundary decide loading UI.
- Why does `id` belong in the query key?
- The answers I want to draw out: Different patients are different cached data.

## App: Add local Suspense and ErrorBoundary

- Wrap `PatientDetail` in local `Suspense` with `Spinner`.
- Wrap the Suspense boundary in local `ErrorBoundary`.
- Keep the layout-level boundary as the catch-all.
- This boundary is contextual. If patient detail fails, the shell and navigation are still useful.
- What would be worse about only having one top-level boundary?
- The answers I want to draw out: It makes a local data failure feel like the whole app failed.

## App: Create useJournals

- Create `features/journal/hooks/useJournals.ts`.
- Add `useQuery`.
- Use `queryKey: ['journals', patientId]`.
- Use `queryFn` to fetch journals for the patient.
- Use the hook in `JournalList`.
- Render loading, error, empty, and success states.
- Empty state is not an error. It is a valid server response that needs its own UI.

## App: Update journal status with useMutation

- Open `JournalEntry.tsx`.
- Add `useMutation` for `updateJournalStatus`.
- Add `useQueryClient`.
- On success, invalidate `['journals', patientId]`.
- Mutation: an operation that changes server state.
- Invalidation: mark cached data as stale so it refetches.
- Why invalidate only this patient's journals instead of everything?
- The answers I want to draw out: Smaller invalidation means less unnecessary work and fewer surprising updates.

## App: Submit journal form through mutation

- Keep the form manual for now.
- Use `useMutation` for `createJournal`.
- On success, invalidate `['journals', patientId]`.
- Reset the form after a successful submit.
- Validation is still not solved. That is the next module.

## Check

- Run `npm run typecheck --workspace=apps/arena`.
- Run `npm test --workspace=apps/arena -- --run`.

## Norsk

## App: Show manual server state

- Åpne dagens patient og journal fetching code.
- Dette er server state. API-et eier dataen, og client viser den.
- Hva håndterer vi manuelt akkurat nå?
- Svarene jeg vil få frem: Loading, errors, retries, stale data, cache, race conditions, refetching etter mutations.
- TanStack Query gir oss en standard måte å beskrive server state på i stedet for å bygge den infrastrukturen i hver component.

## App: Check QueryClientProvider

- Åpne `apps/arena/src/main.tsx`.
- Vis `QueryClientProvider`.
- `QueryClient`.
- Sjekk `staleTime` og `retry`.
- `staleTime`: hvor lenge data regnes som fresh.
- `retry`: hvordan failed requests prøves på nytt.
- React Query Devtools hvis du vil vise cache state under demoen.

## App: Create usePatients

- Lag `features/patients/hooks/usePatients.ts`.
- Legg til `useQuery`.
- Bruk `queryKey: ['patients']`.
- Bruk `queryFn: fetchPatients`.
- En query key er cache address.
- Hva bør skje hvis Dashboard og Patients begge spør etter `['patients']`?
- Svarene jeg vil få frem: De bør reuse samme cache entry.
- Variables hører hjemme i query key når de endrer data som returneres.

## App: Use usePatients

- Åpne `pages/PatientListPage.tsx`.
- Bytt local `patients`, `isLoading` og fetching effect med `usePatients`.
- Render loading, error og success states.
- Åpne `pages/DashboardPage.tsx`.
- Bytt manual fetching med `usePatients`.
- Naviger mellom Dashboard og Patients for å sjekke cache reuse.
- Vi fjernet duplicated fetching logic, men vi fikk også bedre navigation behavior fordi data caches.

## App: Fetch patient detail with useSuspenseQuery

- Åpne `pages/PatientDetailPage.tsx`.
- Lag en indre `PatientDetail` component.
- Bruk `useSuspenseQuery`.
- Bruk `queryKey: ['patient', id]`.
- Bruk `queryFn` til å fetch one patient by id.
- `useSuspenseQuery` ikke gir oss `isLoading`. Den suspender og lar parent boundary bestemme loading UI.
- Hvorfor hører `id` hjemme i query key?
- Svarene jeg vil få frem: Ulike patients er ulik cached data.

## App: Add local Suspense and ErrorBoundary

- Wrap `PatientDetail` i local `Suspense` med `Spinner`.
- Wrap Suspense boundary i local `ErrorBoundary`.
- Behold layout-level boundary som catch-all.
- Denne boundary-en er contextual. Hvis patient detail feiler, er shell og navigation fortsatt useful.
- Hva hadde vært dårligere med bare én top-level boundary?
- Svarene jeg vil få frem: En lokal data failure føles som om hele appen feilet.

## App: Create useJournals

- Lag `features/journal/hooks/useJournals.ts`.
- Legg til `useQuery`.
- Bruk `queryKey: ['journals', patientId]`.
- Bruk `queryFn` til å fetch journals for patient.
- Bruk hook-en i `JournalList`.
- Render loading, error, empty og success states.
- Empty state er ikke en error. Det er en valid server response som trenger egen UI.

## App: Update journal status with useMutation

- Åpne `JournalEntry.tsx`.
- Legg til `useMutation` for `updateJournalStatus`.
- Legg til `useQueryClient`.
- På success, invalidate `['journals', patientId]`.
- Mutation: en operation som endrer server state.
- Invalidation: marker cached data som stale så den refetches.
- Hvorfor invalidate bare denne patient sine journals i stedet for alt?
- Svarene jeg vil få frem: Mindre invalidation betyr mindre unødvendig arbeid og færre surprising updates.

## App: Submit journal form through mutation

- Behold form-en manual for nå.
- Bruk `useMutation` for `createJournal`.
- På success, invalidate `['journals', patientId]`.
- Reset form-en etter successful submit.
- Validation er fortsatt ikke løst. Det er neste module.

## Check

- Kjør `npm run typecheck --workspace=apps/arena`.
- Kjør `npm test --workspace=apps/arena -- --run`.
