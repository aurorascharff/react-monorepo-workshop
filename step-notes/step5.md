# Step 5: Forms

## English

## App: Show the manual form

- Open `features/journal/components/JournalForm.tsx`.
- The form works, but the rules are scattered across submit handling, local error state, and the UI.
- What validation rules can we see from the UI?
- The answers I want to draw out: Required title, required date, content length, server errors.
- For tiny forms this is okay. For real forms it gets hard to change and hard to test.

## App: Add Zod schema

- Import `z` from `zod`.
- Add `journalSchema`.
- Add `title`: required and max 100 characters.
- Add `date`: required.
- Add `content`: required and at least 10 characters.
- Schema: one place that describes valid form data.
- Client validation is for UX. The server must still validate.

## App: Infer form type

- Add `type JournalFormData = z.infer<typeof journalSchema>`.
- Use this type for the form.
- We are not writing the same shape twice. TypeScript follows the schema.
- What happens if the schema changes but a handwritten type does not?
- The answers I want to draw out: The form and validation drift apart.

## App: Wire React Hook Form

- Import `useForm` and `Controller` from `react-hook-form`.
- Import `zodResolver` from `@hookform/resolvers/zod`.
- Create `useForm<JournalFormData>`.
- Add `resolver: zodResolver(journalSchema)`.
- Add `mode: 'onChange'`.
- The answers I want to draw out: `register`, `handleSubmit`, `reset`, `control`, `errors`, and `isValid`.
- React Hook Form: it manages form state without forcing every input value through React state.
- Controlled versus uncontrolled: controlled means React owns the value. Uncontrolled means the DOM owns the value and the form library reads it when needed.

## App: Register text fields

- Replace `name="title"` with `{...register('title')}`.
- Replace `name="content"` with `{...register('content')}`.
- Render `errors.title?.message` below title.
- Render `errors.content?.message` below content.
- Field-level errors are easier to act on than one generic form error.
- What should the user be able to fix from the error message?
- The answers I want to draw out: The message should point to the field and the rule.

## App: Use Controller for DatePicker

- Replace the plain date input with `DatePicker`.
- Use `Controller` for `date`.
- Pass `field.value` and `field.onChange` to `DatePicker`.
- Render `errors.date?.message` below the date field.
- `Controller` is for components that do not plug directly into `register`.
- Why not use `Controller` for every field?
- The answers I want to draw out: Use the simpler `register` path when the input supports it.

## App: Submit with handleSubmit and mutation

- Keep the existing `useMutation` for `createJournal`.
- Replace the manual submit handler with `handleSubmit((data) => mutate(data))`.
- `handleSubmit` only calls our function when the schema passes.
- On success, invalidate `['journals', patientId]`.
- Reset the form.
- Call `onSuccess` if present.
- Which part owns validation, and which part owns the server update?
- The answers I want to draw out: Zod owns validation, React Hook Form owns form state, TanStack Query owns the mutation.

## App: Disable invalid submit and show errors

- Disable the button with `!isValid || isPending`.
- Show `Saving...` while pending.
- Render the mutation error above the fields.
- Server errors still need a place in the UI. Client validation cannot catch network errors, permissions, or backend failures.
- Disabling invalid submit is a product choice. It works here because the rules are simple and visible.

## App: Add tests

- Open `JournalForm.test.tsx`.
- Test disabled submit.
- Test content length error.
- The form test appears now because validation behavior now exists.

## Check

- Run `npm test --workspace=apps/arena -- --run`.

## Norsk

## App: Show the manual form

- Åpne `features/journal/components/JournalForm.tsx`.
- Form-en fungerer, men reglene er spredt i submit handling, local error state og UI.
- Hvilke validation rules kan vi se fra UI?
- Svarene jeg vil få frem: Required title, required date, content length, server errors.
- For tiny forms er dette ok. For real forms blir det vanskelig å endre og teste.

## App: Add Zod schema

- Importer `z` fra `zod`.
- Legg til `journalSchema`.
- Legg til `title`: required og max 100 characters.
- Legg til `date`: required.
- Legg til `content`: required og minst 10 characters.
- Schema: ett sted som beskriver valid form data.
- Client validation er for UX. Server må fortsatt validate.

## App: Infer form type

- Legg til `type JournalFormData = z.infer<typeof journalSchema>`.
- Bruk denne typen for form-en.
- Vi skriver ikke samme shape to ganger. TypeScript følger schema.
- Hva skjer hvis schema endres, men en håndskrevet type ikke gjør det?
- Svarene jeg vil få frem: Form og validation drift-er fra hverandre.

## App: Wire React Hook Form

- Importer `useForm` og `Controller` fra `react-hook-form`.
- Importer `zodResolver` fra `@hookform/resolvers/zod`.
- Lag `useForm<JournalFormData>`.
- Legg til `resolver: zodResolver(journalSchema)`.
- Legg til `mode: 'onChange'`.
- Hent ut `register`, `handleSubmit`, `reset`, `control`, `errors` og `isValid`.
- React Hook Form: den håndterer form state uten å tvinge alle input values gjennom React state.
- Controlled versus uncontrolled: controlled betyr at React eier value. Uncontrolled betyr at DOM eier value og form library leser den når det trengs.

## App: Register text fields

- Bytt `name="title"` med `{...register('title')}`.
- Bytt `name="content"` med `{...register('content')}`.
- Render `errors.title?.message` under title.
- Render `errors.content?.message` under content.
- Field-level errors er lettere å handle på enn én generic form error.
- Hva bør user kunne fikse fra error message?
- Svarene jeg vil få frem: Message bør peke på field og rule.

## App: Use Controller for DatePicker

- Bytt plain date input med `DatePicker`.
- Bruk `Controller` for `date`.
- Send `field.value` og `field.onChange` til `DatePicker`.
- Render `errors.date?.message` under date field.
- `Controller` er for components som ikke plugger direkte inn i `register`.
- Hvorfor ikke bruke `Controller` for alle fields?
- Svarene jeg vil få frem: Bruk enklere `register` path når input støtter det.

## App: Submit with handleSubmit and mutation

- Behold eksisterende `useMutation` for `createJournal`.
- Bytt manual submit handler med `handleSubmit((data) => mutate(data))`.
- `handleSubmit` kaller function-en vår bare når schema passerer.
- På success, invalidate `['journals', patientId]`.
- Reset form-en.
- Kall `onSuccess` hvis den finnes.
- Hvilken del eier validation, og hvilken del eier server update?
- Svarene jeg vil få frem: Zod eier validation, React Hook Form eier form state, TanStack Query eier mutation.

## App: Disable invalid submit and show errors

- Disable button med `!isValid || isPending`.
- Vis `Saving...` mens pending.
- Render mutation error over fields.
- Server errors trenger fortsatt et sted i UI. Client validation kan ikke fange network errors, permissions eller backend failures.
- Disabled invalid submit er et product choice. Det fungerer her fordi reglene er enkle og synlige.

## App: Add tests

- Åpne `JournalForm.test.tsx`.
- Test disabled submit.
- Test content length error.
- Form test kommer nå fordi validation behavior finnes nå.

## Check

- Kjør `npm test --workspace=apps/arena -- --run`.
