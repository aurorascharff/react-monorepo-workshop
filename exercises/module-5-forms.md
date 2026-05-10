# Module 5: Forms

Work in: `apps/arena`.

## Problem

The form submits, but validation rules, submit state, and recovery from errors are hard to see and change. The user should know what to fix before invalid data is sent.

## Task

1. Add a Zod schema for the new journal form and use it with React Hook Form.

2. Connect the existing title, date, and content fields to the form. Show field-level validation errors next to the fields they belong to.

3. Submit valid data through the existing create-journal mutation flow and refresh the journal list after a successful submit.

4. Keep invalid submit accessible: let the user submit, show validation feedback, and do not send invalid client-side data to the API.

5. While the request is pending, make the submit state clear and prevent duplicate submits. If the server request fails, show a form-level error.

## Resources

- [React Hook Form: Get started](https://react-hook-form.com/get-started)
- [Zod: Basics](https://zod.dev/basics)
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
