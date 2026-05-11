# Step 5: Forms

## Before They Work

- Say: the problem is not that the form submits. The problem is that validation, submit state, and recovery are hard to see and change.
- Question: what should be clear to the user, and what should be clear to the developer maintaining the form?
- Answer: forms need visible rules, field-level feedback, submit state, and a place for server errors.
- Show Exercise Five in [`exercises/exercise-5-forms.md`](../../exercises/exercise-5-forms.md).

## Participant Work

- Work time: roughly 15 minutes.
- Discussion: roughly 5 minutes.
- Listen for validation rules, `register` versus `Controller`, field errors versus server errors, and client versus server validation.
- Question before live coding: what did you make easier for the user, and what did you make easier for the developer?

## Show the Manual Form

- Open `features/journal/components/JournalForm.tsx`.
- Open the form in the browser.
- Inspect the title, date, and content fields in Elements and Accessibility.
- Say: shared primitives already handle a lot of keyboard, focus, and ARIA behavior. The form still owns labels, validation messages, `aria-invalid`, and `aria-describedby`.
- Question: what validation rules can we see from the UI?
- Answer: required title, required date, content length, and server errors.
- Point out: labels exist, but validation feedback is generic and not connected well enough to the field the user needs to fix.

## Add Zod Schema

- Import [`z`](https://zod.dev/basics) from `zod`.
- Add `journalSchema` with title, date, and content rules.
- Say: a [schema](https://zod.dev/basics) keeps valid form data in one place.
- Question: what is easier once validation lives in a schema?
- Answer: validation rules, error messages, and inferred TypeScript types change together.
- Say: client validation is for UX. The server must still validate.

## Infer Form Type

- Add `type JournalFormData = z.infer<typeof journalSchema>`.
- Use it for the form.
- Question: what happens if the schema changes but a handwritten type does not?
- Answer: the form and validation drift apart.

## Wire React Hook Form

- Import [`useForm`](https://react-hook-form.com/docs/useform), [`Controller`](https://react-hook-form.com/docs/usecontroller/controller), and [`zodResolver`](https://github.com/react-hook-form/resolvers#zod).
- Create `useForm<JournalFormData>` with `resolver: zodResolver(journalSchema)` and `mode: 'onChange'`.
- Pull out `register`, `handleSubmit`, `reset`, `control`, and `errors`.
- Say: [React Hook Form](https://react-hook-form.com/get-started) manages form state without forcing every input through React state.
- Controlled versus uncontrolled: controlled means React owns the value; uncontrolled means the DOM owns it and the form library reads it when needed.

## Register Text Fields

- Replace `name="title"` with `{...register('title')}`.
- Replace `name="content"` with `{...register('content')}`.
- Render `errors.title?.message` and `errors.content?.message` below the fields.
- Connect messages with `aria-describedby`.
- Add `aria-invalid` when a field has an error.
- Question: what should the user be able to fix from the error message?
- Answer: the message should point to the field and the rule.

## Use Controller for DatePicker

- Replace the plain date input with `DatePicker`.
- Use `Controller` for `date`.
- Pass `field.value`, `field.onChange`, and `id="date"` to `DatePicker`.
- Inspect the date picker in Accessibility and confirm the visible label names the control.
- Render and connect `errors.date?.message`.
- Say: the shared primitive handles button, popover, calendar, focus, and keyboard behavior. We pass form semantics into it.
- Question: why not use `Controller` for every field?
- Answer: use the simpler [`register`](https://react-hook-form.com/docs/useform/register) path when the input supports it.

## Submit with Mutation

- Keep the existing `useMutation` for `createJournal`.
- Replace manual submit handling with [`handleSubmit`](https://react-hook-form.com/docs/useform/handlesubmit).
- Open Network and verify invalid client-side data does not create a POST request.
- On success, invalidate `['journals', patientId]`, reset the form, and call `onSuccess` if present.
- Question: which part owns validation, and which part owns the server update?
- Answer: [Zod](https://zod.dev/basics) owns validation, [React Hook Form](https://react-hook-form.com/get-started) owns form state, and [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) owns the mutation.

## Submit State and Errors

- Keep validation messages visible before submit.
- Prevent duplicate submits only while `isPending`.
- Show pending state near the submit button.
- Render mutation errors above the fields with `role="alert"`.
- Say: server errors need their own place. Client validation cannot catch network errors, permissions, or backend failures.
- Question: where should server errors be shown so the user can recover?
- Answer: near the form submit area or above the fields, where it is clear the whole submission failed.

## Close

- Commit and push the module solution.
- Say: If you prefer my solution to what you wrote, you can discard your local changes now and run `git pull` to get the version I just pushed.
