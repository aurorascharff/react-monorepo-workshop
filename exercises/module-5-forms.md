# Module 5: Forms

Objective: make the journal form easier to validate, submit, and recover from errors.

Work in: `apps/arena`.

## Do

- Refactor the new journal form so validation rules are easier to see and change.
- Look at the journal form, the API helper it submits through, and the shared date picker.
- Show field-level validation errors next to the fields they belong to.
- Make submit state clear to the user.
- Keep the existing API submit flow.
- Update the journal list after a successful submit.
- Show a form-level error if the server request fails.
- Inspect labels and focus in Elements or Accessibility.
- Use Network to check when the form does or does not submit a request.

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
