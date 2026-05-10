# Step 5: Forms

## Introduce task in repo

- Problem: validation rules are scattered and errors are too vague.
- Concepts: React Hook Form, Zod schema, `zodResolver`, field errors, server errors, and mutation submit.
- Rule of thumb: client validation is for UX, server validation is still required.
- Outcome: schema-backed form with field errors, disabled invalid submit, and server error feedback.
- Show Module 5 in `EXERCISES.md`.

## Participant work (roughly 15 minutes)

- Ask participants to work in `apps/arena`.
- Listen for where validation rules live, `register` versus `Controller`, field errors versus server errors, and client validation versus server validation.

## Group discussion (roughly 5 minutes)

- Focus on where people put validation rules, how they handled errors, and where `register` versus `Controller` was unclear.
- Land this point: the schema keeps validation rules in one place. The form library manages form state. The mutation manages the API call. The server remains the final authority.

## App: Show the manual form

- Open `features/journal/components/JournalForm.tsx`.
- Open the form in the browser.
- Open Elements and Accessibility, then inspect the title, date, and content fields.
- The form works, but the rules are scattered across submit handling, local error state, and the UI.
- What validation rules can we see from the UI?
- Answer to land: required title, required date, content length, and server errors.
- For tiny forms this is okay. For real forms it gets hard to change and hard to reason about.

## App: Add Zod schema

- Import `z` from `zod`.
- Add `journalSchema`.
- Add `title`: required and max 100 characters.
- Add `date`: required.
- Add `content`: required and at least 10 characters.
- Schema: one place that describes valid form data.
- What is easier to change once validation lives in a schema?
- Answer to land: validation rules, error messages, and inferred TypeScript types can change together in one place.
- Client validation is for UX. The server must still validate.

## App: Infer form type

- Add `type JournalFormData = z.infer<typeof journalSchema>`.
- Use this type for the form.
- We are not writing the same shape twice. TypeScript follows the schema.
- What happens if the schema changes but a handwritten type does not?
- Answer to land: the form and validation drift apart.

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
- Answer to land: the message should point to the field and the rule.

## App: Use Controller for DatePicker

- Replace the plain date input with `DatePicker`.
- Use `Controller` for `date`.
- Pass `field.value` and `field.onChange` to `DatePicker`.
- Pass `id="date"` so the visible label names the date picker button.
- Inspect the date picker in the Accessibility panel and confirm the visible label names the control.
- Render `errors.date?.message` below the date field.
- `Controller` is for components that do not plug directly into `register`.
- Why not use `Controller` for every field?
- Answer to land: use the simpler `register` path when the input supports it.

## App: Submit with handleSubmit and mutation

- Keep the existing `useMutation` for `createJournal`.
- Replace the manual submit handler with `handleSubmit((data) => mutate(data))`.
- `handleSubmit` only calls our function when the schema passes.
- Open Network and verify that invalid client-side data does not create a POST request.
- On success, invalidate `['journals', patientId]`.
- Reset the form.
- Call `onSuccess` if present.
- Which part owns validation, and which part owns the server update?
- Answer to land: Zod owns validation, React Hook Form owns form state, and TanStack Query owns the mutation.

## App: Disable invalid submit and show errors

- Disable the button with `!isValid || isPending`.
- Show `Saving...` while pending.
- Render the mutation error above the fields.
- Server errors still need a place in the UI. Client validation cannot catch network errors, permissions, or backend failures.
- Use Network while submitting a valid form to show the request that still goes to the server.
- Where should server errors be shown so the user can recover?
- Answer to land: near the form submit area or above the fields, where the user can see that the whole submission failed rather than one field being invalid.
- Disabling invalid submit is a product choice. It works here because the rules are simple and visible.

## Check and module close

- Run `npm run typecheck --workspace=apps/arena`.
- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Give everyone a moment to catch up before the wrap-up.
