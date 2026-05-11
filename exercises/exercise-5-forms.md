# Module 5: Forms

## Problem

The form submits, but validation rules, submit state, and recovery from errors are hard to see and change. The user should know what to fix before invalid data is sent.

## Task

1. Add a Zod schema for the new journal form in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx) and use it with React Hook Form.

2. Connect the existing title, date, and content fields in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx) to React Hook Form. Keep each visible label connected to its control.

3. Submit valid data through the existing create-journal mutation flow in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx) and refresh the journal list after a successful submit.

4. Use the existing shared UI primitives for controls that need more than a plain input. For the date field in [JournalForm](../apps/arena/src/features/journal/components/JournalForm.tsx), use the shared [`DatePicker`](../packages/ui/src/base/date-picker.tsx) instead of building calendar behavior inside the form. Add the form-specific labels and error relationships in the form.

5. Keep invalid submit accessible: let the user submit, show field-level validation errors, associate each error with its field, and do not send invalid client-side data to the API.

6. While the request is pending, make the submit state clear where the submit happens and prevent duplicate submits. If the server request fails, show a form-level error that is announced as feedback for the submit.

## Bonus

1. Add success feedback after a journal entry is saved, then make sure it does not hide field errors or server errors.

2. Test the form with keyboard only. Improve focus, labels, or error relationships if anything is hard to use without a mouse.

## Resources

- [React Hook Form: Get started](https://react-hook-form.com/get-started)
- [Zod: Basics](https://zod.dev/basics)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: Form accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form)
