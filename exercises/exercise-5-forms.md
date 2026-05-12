# Exercise Five: Forms

## Problem

The form submits, but validation rules, submit state, and recovery from errors are hard to see and change.

## Task

If your structure differs from the reference files, make the same kind of change in the equivalent place in your app.

1. Add a Zod schema for the new journal form. In the reference structure, the form lives in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx). Use the schema with React Hook Form.

2. Connect the existing title, date, and content fields to React Hook Form. Keep the labels connected to their controls.

3. Submit valid data through the existing create-journal mutation flow and refresh the journal list after a successful submit.

4. Use shared UI primitives for controls that need more than a plain input. For the date field, use the shared [`DatePicker`](../packages/ui/src/base/date-picker.tsx). Add the form-specific labels and error relationships in the form.

5. Make invalid submit accessible: show field-level validation errors, associate each error with its field, and do not send invalid client-side data to the API.

6. Show pending and server-error states near the submit action. Prevent duplicate submits while the request is pending.

## Bonus

1. Add success feedback after a journal entry is saved, then make sure it does not hide field errors or server errors.

2. Test the form with keyboard only. Improve focus, labels, or error relationships if anything is hard to use without a mouse.

## Resources

- [React Hook Form: Get started](https://react-hook-form.com/get-started)
- [Zod: Basics](https://zod.dev/basics)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: Form accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
