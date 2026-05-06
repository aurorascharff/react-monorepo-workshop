// Reference test for Module 3.
//
// The real test lives on `main` and exercises the `usePatientFilter` hook
// you extract from `PatientPage.tsx`. It can't run on the starter because
// `./usePatientFilter` doesn't exist yet — importing it here would crash
// the test runner.
//
// When you finish Module 3, copy the test body from:
// https://github.com/aurorascharff/react-monorepo-workshop/blob/main/apps/arena/src/features/patients/hooks/usePatientFilter.test.ts

describe.skip('usePatientFilter (Module 3)', () => {
  it.todo('returns all patients when no filters are applied')
  it.todo('filters by gender')
  it.todo('filters by debounced search across name and diagnosis')
  it.todo('combines search and gender filters')
})
