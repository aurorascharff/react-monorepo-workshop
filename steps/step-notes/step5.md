# Step 5: Forms

## Frame what we are solving

- Say: the problem is not that the form submits. The problem is that validation, submit state, and error recovery are hard to see and change.
- Ask: what should be clear to the user, and what should be clear to the developer maintaining the form?
- Land this: forms need visible rules, field-level feedback, submit state, and a place for server errors.
- Show Exercise Five in [`exercises/exercise-5-forms.md`](../../exercises/exercise-5-forms.md).

## Participant work (roughly 15 minutes)

- Ask participants to work in `apps/arena`.
- Listen for where validation rules live, `register` versus `Controller`, field errors versus server errors, and client validation versus server validation.

## Group discussion (roughly 5 minutes)

- Focus on where people put validation rules, how they handled errors, and where `register` versus `Controller` was unclear.
- Land this point: the schema keeps validation rules in one place. The form library manages form state. The mutation manages the API call. The server remains the final authority.
- Ask before live coding: what did you make easier for the user, and what did you make easier for the developer?

## App: Show the manual form

- Open `features/journal/components/JournalForm.tsx`.
- Open the form in the browser.
- Open Elements and Accessibility, then inspect the title, date, and content fields.
- The form works, but the rules are scattered across submit handling, local error state, and the UI.
- Point out that shared Base UI primitives already give us a lot. `Select`, `DatePicker`, `Popover`, and `Calendar` use a compound component pattern so keyboard behavior, focus handling, and ARIA roles are handled by the primitive instead of being rebuilt in the app.
- The form still owns meaning. We provide labels, validation messages, `aria-invalid`, and `aria-describedby` because those depend on this specific form and this specific field.
- What validation rules can we see from the UI?
- Answer to land: required title, required date, content length, and server errors.
- The rules are split across submit handling, local error state, and JSX.
- The starter has labels, which is good. The missing accessibility work is that validation feedback is generic and not connected to the field the user needs to fix.

## App: Add Zod schema

- Import [`z`](https://zod.dev/basics) from `zod`.
- Add `journalSchema`.
- Add `title`: required and max 100 characters.
- Add `date`: required.
- Add `content`: required and at least 10 characters.
- [Schema](https://zod.dev/basics): one place that describes valid form data.
- What is easier to change once validation lives in a schema?
- Answer to land: validation rules, error messages, and inferred TypeScript types can change together in one place.
- Client validation is for UX. The server must still validate.

## App: Infer form type

- Add `type JournalFormData = z.infer<typeof journalSchema>`, using [Zod type inference](https://zod.dev/basics#inferring-types).
- Use this type for the form.
- We are not writing the same shape twice. TypeScript follows the schema.
- What happens if the schema changes but a handwritten type does not?
- Answer to land: the form and validation drift apart.

## App: Wire React Hook Form

- Import [`useForm`](https://react-hook-form.com/docs/useform) and [`Controller`](https://react-hook-form.com/docs/usecontroller/controller) from `react-hook-form`.
- Import [`zodResolver`](https://github.com/react-hook-form/resolvers#zod) from `@hookform/resolvers/zod`.
- Create `useForm<JournalFormData>`.
- Add `resolver: zodResolver(journalSchema)`.
- Add `mode: 'onChange'`.
- The answers I want to draw out: `register`, `handleSubmit`, `reset`, `control`, and `errors`.
- [React Hook Form](https://react-hook-form.com/get-started): it manages form state without forcing every input value through React state.
- Controlled versus uncontrolled: controlled means React owns the value. Uncontrolled means the DOM owns the value and the form library reads it when needed.

## App: Register text fields

- Replace `name="title"` with `{...register('title')}`.
- Replace `name="content"` with `{...register('content')}`.
- Render `errors.title?.message` below title with an id, then connect it to the input with `aria-describedby`.
- Render `errors.content?.message` below content with an id, then connect it to the textarea with `aria-describedby`.
- Add `aria-invalid` when a field has an error.
- Native inputs already give us the basic HTML semantics. Our job here is to connect the validation state to the right field.
- Field-level errors are easier to act on than one generic form error.
- What should the user be able to fix from the error message?
- Answer to land: the message should point to the field and the rule.

## App: Use Controller for DatePicker

- Replace the plain date input with `DatePicker`.
- Use `Controller` for `date`.
- Pass `field.value` and `field.onChange` to `DatePicker`.
- Pass `id="date"` so the visible label names the date picker button.
- Inspect the date picker in the Accessibility panel and confirm the visible label names the control.
- Render `errors.date?.message` below the date field with an id, then connect it to the date picker with `aria-describedby`.
- Add `aria-invalid` when the date field has an error.
- We are not writing the date picker accessibility from scratch. The shared primitive handles the button, popover, calendar, focus, and keyboard behavior. We pass the form-level semantics into it.
- [`Controller`](https://react-hook-form.com/docs/usecontroller/controller) is for components that do not plug directly into [`register`](https://react-hook-form.com/docs/useform/register).
- Why not use `Controller` for every field?
- Answer to land: use the simpler `register` path when the input supports it.

## App: Submit with handleSubmit and mutation

- Keep the existing `useMutation` for `createJournal`.
- Replace the manual submit handler with `handleSubmit((data) => mutate(data))`.
- [`handleSubmit`](https://react-hook-form.com/docs/useform/handlesubmit) only calls our function when the schema passes.
- Open Network and verify that invalid client-side data does not create a POST request.
- On success, invalidate `['journals', patientId]`.
- Reset the form.
- Call `onSuccess` if present.
- Which part owns validation, and which part owns the server update?
- Answer to land: [Zod](https://zod.dev/basics) owns validation, [React Hook Form](https://react-hook-form.com/get-started) owns form state, and [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) owns the mutation.

## App: Show submit state and errors

- Keep validation messages visible before submit.
- Prevent duplicate submits while `isPending`.
- Show a clear pending state while saving. Keep it near the submit button because that is where the user acted.
- Render the mutation error above the fields with `role="alert"`.
- Server errors need a place in the UI. Client validation cannot catch network errors, permissions, or backend failures.
- Use Network while submitting a valid form to show the request that still goes to the server.
- Where should server errors be shown so the user can recover?
- Answer to land: near the form submit area or above the fields, where the user can see that the whole submission failed rather than one field being invalid.
- Do not block invalid submit here. Let `handleSubmit` run validation, keep errors visible, and only disable while pending.

## Check and module close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
- Pause for participants who want to pull the pushed solution.
