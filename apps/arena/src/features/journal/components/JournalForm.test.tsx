// Reference test for Module 5 (extracted in Module 1).
//
// The real test lives on `main` and exercises validation in `<JournalForm>`
// after it has been wired up to React Hook Form + Zod. It can't run on the
// starter because `JournalForm.tsx` doesn't exist at this path yet — the
// form is still inlined in `apps/arena/src/PatientPage.tsx`, and importing
// `./JournalForm` here would crash the test runner.
//
// When you finish Module 5, copy the test body from:
// https://github.com/aurorascharff/react-monorepo-workshop/blob/main/apps/arena/src/features/journal/components/JournalForm.test.tsx

describe.skip('JournalForm (Module 5)', () => {
  it.todo('shows validation errors when required fields are missing')
  it.todo('shows a length error when content is too short')
})
