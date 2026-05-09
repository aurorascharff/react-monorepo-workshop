# Workshop Step Snapshots

Each `steps/stepN/` directory is a complete runnable monorepo snapshot for that point in the workshop. `steps/step0/` is the participant-facing starter, and `steps/step1/` through `steps/step5/` are the completed module checkpoints.

Tasks live in `EXERCISES.md` in the starter repo instead of as task comments in the code. Tests are introduced only once the corresponding module has created the code they exercise, so earlier snapshots do not reveal future feature folders.

```bash
cd steps/step0
npm install
npm run db:seed
npm run dev
```

The same commands work from any `steps/stepN/` folder.

The global instructor run sheet lives in [`../STEPS.md`](../STEPS.md). The stable workshop reference lives in [`../WORKSHOP.md`](../WORKSHOP.md). The per-step live-coding notes live in [`../step-notes`](../step-notes) so these snapshot folders stay focused on runnable app code.

## Step Map

- `steps/step0/` - Starter with pre-module implementation and only the generic smoke test.
- `steps/step1/` - Module 1 complete: feature folders, focused components, shared `StatusBadge`, and layout-level error boundary.
- `steps/step2/` - Module 2 complete: React Router routes, nested layout, real URLs, and link-based navigation.
- `steps/step3/` - Module 3 complete: derived state is computed during render and patient filtering is extracted to `usePatientFilter`.
- `steps/step4/` - Module 4 complete: patient and journal data use TanStack Query, mutation success invalidates relevant cached queries, and detail loading is protected by local suspense and error boundaries.
- `steps/step5/` - Module 5 complete: journal creation uses React Hook Form and Zod validation with field errors, disabled invalid submit, and server error feedback.
