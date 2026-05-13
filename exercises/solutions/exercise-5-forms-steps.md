# Exercise Five: Forms — Walkthrough

> Companion to [`exercise-5-forms.md`](../exercise-5-forms.md). Read the brief first; come back here for one workable order of operations with the rationale.

## Problem

The problem isn't that the form submits — it's that validation rules, submit state, and recovery from errors are hard to see and change. Forms need visible rules, field-level feedback, submit state, and a place for server errors.

Open [`features/journal/components/JournalForm.tsx`](../../apps/arena/src/features/journal/components/JournalForm.tsx) in code and in the browser. Inspect title, date, and content in DevTools Elements + Accessibility. What rules can you see from the UI? Required title, required date, content length, server errors. Labels exist, but feedback is generic and not connected well enough to the field that needs fixing.

Shared primitives already handle a lot of keyboard, focus, and ARIA behavior. The form still owns labels, validation messages, [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid), and [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby).

> **Client validation is for UX. The server must still validate.** That's why the [API](../../apps/api/src/routes) also has a [Zod](https://zod.dev) schema — client validation makes the form pleasant; server validation keeps the system safe.

## Task

### 1. Add a Zod schema

Import [`z`](https://zod.dev/basics) and define `journalSchema`:

```ts
import { z } from 'zod'

const journalSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot be longer than 100 characters'),
  date: z.string().min(1, 'Date is required'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
})

type JournalFormData = z.infer<typeof journalSchema>
```

Use `JournalFormData` as the form's value type — don't write a parallel handwritten type.

> [`z.infer`](https://zod.dev/basics) keeps validation rules, error messages, and the TS type in lockstep. Change the schema; nothing drifts. A handwritten type would silently drift instead.

### 2. Connect title and content to React Hook Form

Import [`useForm`](https://react-hook-form.com/docs/useform), [`Controller`](https://react-hook-form.com/docs/usecontroller/controller), and [`zodResolver`](https://github.com/react-hook-form/resolvers#zod). Create the form with `mode: 'onChange'` so feedback updates as the user types:

```tsx
const {
  handleSubmit,
  reset,
  control,
  formState: { errors },
} = useForm<JournalFormData>({
  resolver: zodResolver(journalSchema),
  mode: 'onChange',
  defaultValues: { title: '', date: '', content: '' },
})
```

Use [`register`](https://react-hook-form.com/docs/useform/register) for plain inputs and [`Controller`](https://react-hook-form.com/docs/usecontroller/controller) for primitives that don't forward refs the way RHF expects. The title and content fields work with either approach — `Controller` keeps consistency with the [`DatePicker`](../../packages/ui/src/base/date-picker.tsx) substep:

```tsx
<Label htmlFor="title">Title</Label>
<Controller
  name="title"
  control={control}
  render={({ field }) => (
    <Input
      id="title"
      {...field}
      aria-invalid={Boolean(errors.title)}
      aria-describedby={errors.title ? 'title-error' : undefined}
    />
  )}
/>
{errors.title && (
  <p id="title-error" className="text-xs text-destructive">
    {errors.title.message}
  </p>
)}
```

Same shape for `content` with a [`Textarea`](../../packages/ui/src/base/textarea.tsx). Keep `<Label htmlFor="...">` tied to `id="..."` on the input.

> **Controlled vs. uncontrolled.** Controlled means React owns the value; uncontrolled means the DOM owns it and [React Hook Form](https://react-hook-form.com/) reads it when needed. `register` is uncontrolled (faster, no re-render per keystroke); `Controller` is controlled (works with primitives that need React to drive them). Use the simpler `register` path when the input supports it.

### 3. Submit through the existing mutation

Keep the `useCreateJournal` hook from Exercise 4. Replace manual submit handling with `handleSubmit(submitFn)`:

```tsx
const { mutate, isPending, error } = useCreateJournal(patientId)

function submitJournal(data: JournalFormData) {
  mutate(data, {
    onSuccess: () => reset({ title: '', date: '', content: '' }),
  })
}

;<form onSubmit={handleSubmit(submitJournal)}>{/* fields */}</form>
```

On mutation success, invalidate `['journals', patientId]` and call any `onSuccess` callback. Watch DevTools Network — invalid client-side data should not produce a POST request.

> [Zod](https://zod.dev) owns validation. [React Hook Form](https://react-hook-form.com/) owns form state. [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) owns the mutation. Three libraries, three responsibilities, one form.

### 4. Use `DatePicker` via `Controller`

Replace the plain date input with the shared [`DatePicker`](../../packages/ui/src/base/date-picker.tsx). Wire it through `Controller`:

```tsx
<Label htmlFor="date">Date</Label>
<Controller
  name="date"
  control={control}
  render={({ field }) => (
    <DatePicker
      id="date"
      value={field.value}
      onChange={field.onChange}
      aria-invalid={Boolean(errors.date)}
      aria-describedby={errors.date ? 'date-error' : undefined}
    />
  )}
/>
{errors.date && <p id="date-error" className="text-xs text-destructive">{errors.date.message}</p>}
```

Inspect the date picker in DevTools Accessibility. The visible label should name the control — `htmlFor="date"` on `<Label>` matches `id="date"` on the picker.

> The shared primitive handles button, popover, calendar, focus, and keyboard behavior. The form only passes `field.value` and `field.onChange` from `Controller`, plus the label and error relationships.

### 5. Make invalid submit accessible

For each field:

- Render `errors.<field>?.message` below the input.
- Add [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) to the input.
- Connect the message with [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby).
- Give the message element an `id` matching that `aria-describedby`.

Tab through with the keyboard. Each error should be announced once and tied to its field.

> The message should point to the field and the rule — "Content must be at least 10 characters", not "Invalid input". Sending invalid client-side data to the API is a round-trip for a result you already know.

### 6. Show pending and server-error states near the submit

Keep validation visible before submit. Prevent duplicate submits only while the mutation is pending. Show pending state near the submit button — not as a page-level spinner. Render mutation errors above the fields with [`role="alert"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role):

```tsx
<form onSubmit={handleSubmit(submitJournal)}>
  {error && (
    <div role="alert" className="text-destructive ...">
      We could not save the journal entry. Try again.
    </div>
  )}

  {/* fields */}

  <Button type="submit" disabled={isPending}>
    {isPending ? 'Saving…' : 'Save entry'}
  </Button>
</form>
```

> Client validation can't catch network errors, permissions, or backend failures — server errors need their own place. "We could not save the journal entry" beats leaking `POST /journals 500: Internal Server Error`.

## Bonus

### 1. Add success feedback

Show a [`role="status"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role) message after a successful save. Only one of `{ pending, error, success }` should be visible at a time:

```tsx
const [successMessage, setSuccessMessage] = useState('')

useMutation({
  onMutate: () => setSuccessMessage(''),
  onSuccess: () => setSuccessMessage('Journal entry saved.'),
})

{
  successMessage && !error && <div role="status">{successMessage}</div>
}
```

### 2. Test with the keyboard only

Tab through the form, trigger an error, fix it, submit. Each error should be announced once; focus shouldn't jump unexpectedly. See [MDN's form accessibility guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form).

## Resources

- [React Hook Form: Get started](https://react-hook-form.com/get-started) · [`useForm`](https://react-hook-form.com/docs/useform) · [`register`](https://react-hook-form.com/docs/useform/register) · [`Controller`](https://react-hook-form.com/docs/usecontroller/controller) · [`handleSubmit`](https://react-hook-form.com/docs/useform/handlesubmit) · [`zodResolver`](https://github.com/react-hook-form/resolvers#zod)
- [Zod: Basics](https://zod.dev/basics) · [`z.infer`](https://zod.dev/basics#literals)
- [TanStack Query: Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [MDN: Form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) · [Form accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form) · [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) · [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-describedby) · [`role="alert"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role)
