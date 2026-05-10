# Module 5: Forms

Work in: `apps/arena`.

## Problem

The form submits, but validation rules, submit state, and recovery from errors are hard to see and change. The user should know what to fix before invalid data is sent.

## Task

- Add a Zod schema for the new journal form.
- Use React Hook Form with the Zod schema.
- Register the text fields and use `Controller` for the date picker.
- Show field-level validation errors next to the fields they belong to.
- Make submit state clear to the user.
- Submit valid form data through the existing API mutation flow.
- Update the journal list after a successful submit.
- Show a form-level error if the server request fails.
- Keep labels and focus behavior accessible.
- Prevent invalid client-side data from sending a create request.

## Check

- Invalid fields show clear messages.
- The submit button is disabled when the form is invalid or submitting.
- The date picker is labeled like the other form fields.
- A successful submit updates the journal list.
- Server errors are visible to the user.
- Invalid client-side data does not send a create request in the Network tab.

## Resources

- [React Hook Form: Get started](https://react-hook-form.com/get-started)
- [Zod: Basics](https://zod.dev/basics)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
