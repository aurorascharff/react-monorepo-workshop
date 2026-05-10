# UI

`@medix/ui` is the shared UI package. It contains generic Base UI primitives and small Domain UI wrappers used by both Arena and medix.com.

## Run

```bash
npm run typecheck --workspace=packages/ui
npm test --workspace=packages/ui
```

## Structure

```text
src/
  base/          - generic primitives such as Button, Card, Input, Select
  StatusBadge.tsx
  index.ts       - public package exports
  styles.css     - package styles
```

## Layers

Base UI should stay generic. It should not know about patients, journals, or product workflows.

Domain UI can know shared product concepts, such as journal status.

App UI belongs in the app when it is tied to one screen or workflow.

## Notes

Apps should import public UI from `@medix/ui`, not from deep internal paths.
