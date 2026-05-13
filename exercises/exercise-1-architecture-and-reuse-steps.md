# Exercise One: Architecture and Reuse — Walkthrough

> Companion to [`exercise-1-architecture-and-reuse.md`](exercise-1-architecture-and-reuse.md). Read the brief first; come back here for one workable order of operations with the rationale behind each move.

## Problem

The problem is not that the files are long — it's that responsibilities are hidden. If the status styling, the layout, or the journal form needed to change later, where would you look?

Open [`apps/arena/src/App.tsx`](../apps/arena/src/App.tsx) and [`apps/arena/src/PatientPage.tsx`](../apps/arena/src/PatientPage.tsx) side by side:

- `App.tsx` mixes shell (sidebar, mobile header, page wrapper) with navigation state ([`useState<Page>`](https://react.dev/reference/react/useState)).
- `PatientPage.tsx` holds six responsibilities in one file — list, card, header, journal list, entry, and form — plus an inline `STATUS_STYLES` map.
- The Medix wordmark is duplicated in `App.tsx` and in [`apps/medix.com/app/layout.tsx`](../apps/medix.com/app/layout.tsx).

We work outward from the shell to shared concepts. Shell first creates a clean seam everything else relies on.

## Task

### 1. Move the shell into a named layout

Create [`apps/arena/src/layouts/Layout.tsx`](../apps/arena/src/layouts/Layout.tsx) and move the sidebar, mobile header, and `<main>` wrapper out of `App.tsx`. Keep `page` state in `App.tsx` for now — the URL takes it over in Exercise 2.

```tsx
// layouts/Layout.tsx
type LayoutProps = {
  children: ReactNode
  activePage: 'dashboard' | 'patients'
  onNavigate: (page: 'dashboard' | 'patients') => void
}

export function Layout({ children, activePage, onNavigate }: LayoutProps) {
  return (
    <div className="flex min-h-screen ...">
      <aside>{/* sidebar + nav buttons */}</aside>
      <main>{children}</main>
    </div>
  )
}
```

```tsx
// App.tsx
<Layout activePage={page} onNavigate={setPage}>
  {page === 'dashboard' ? <Dashboard /> : <PatientPage />}
</Layout>
```

Keep the inline brand markup in the sidebar — `BrandMark` arrives in step 5.

> **Why start with the shell?** The shell is everything that isn't page content — an obvious boundary. Starting there gives a clean seam without forcing patient/journal naming decisions yet. This isn't routing; we're only separating shell from page content.

### 2. Split patient and journal UI into named components

Before opening the code, name the components from the running UI alone. There should be six:

| UI region                                  | Component                  |
| ------------------------------------------ | -------------------------- |
| Search + gender filter + patient grid      | `PatientList`              |
| One row in that grid                       | `PatientCard`              |
| Selected-patient summary card              | `PatientHeader`            |
| Column of journal entries on detail screen | `JournalList`              |
| One journal entry with its status select   | `JournalEntry`             |
| The "new journal entry" form               | `JournalForm`              |

> If a component name feels fake, the boundary is fake. Decide the shape on paper before the file moves go mechanical.

```
apps/arena/src/features/
  patients/components/   PatientList.tsx, PatientCard.tsx, PatientHeader.tsx
  journal/components/    JournalList.tsx, JournalEntry.tsx, JournalForm.tsx
```

Leave fetching, mutations, and form logic exactly where they were — Exercises [3](exercise-3-state-and-effects.md), [4](exercise-4-server-state.md), and [5](exercise-5-forms.md) each replace one of those. We're moving code, not improving it. The native `<select>` elements stay too — step 4 swaps them.

> **What goes in a feature folder, and what doesn't?** Feature folders group by what the app does. A route-local `_components` folder (like [`apps/medix.com/app/products/_components`](../apps/medix.com/app/products)) is fine when code belongs to one specific route. Patient and journal screens are app workflow — they stay in `apps/arena`, not in `packages/ui`.

### 3. Add an error boundary around the page content

[`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) is already a dependency. Create `apps/arena/src/components/ErrorBoundary.tsx` so it owns the fallback UI; callers only choose placement and copy.

```tsx
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { logError } from '@/lib/logger'

export function ErrorBoundary({ children, title, message, logContext }: Props) {
  return (
    <ReactErrorBoundary
      onError={(error) => logError(error, logContext)}
      fallbackRender={({ resetErrorBoundary }) => (
        <Fallback title={title} message={message} onRetry={resetErrorBoundary} />
      )}
    >
      {children}
    </ReactErrorBoundary>
  )
}
```

In `Layout.tsx`, wrap the `<main>` slot:

```tsx
<main>
  <ErrorBoundary>{children}</ErrorBoundary>
</main>
```

To verify, throw an error inside `PatientList`:

```tsx
throw new Error('Test boundary')
```

The sidebar should stay visible; only the page content should be replaced by the fallback. Remove the throw.

> **Why around `<main>` and not the whole `<Layout>`?** The smallest boundary that still lets the user navigate away. Wrapping the whole layout would hide the sidebar — the user would have no exit short of a refresh.

> **Why log with [`logError`](../apps/arena/src/lib/logger.ts) but show friendly copy?** Stack traces aren't actionable for the user, and internal details shouldn't leak into the UI. The fallback gives the user a way forward; `logError` gives you the technical context.

> [Next.js error boundaries](https://aurorascharff.no/posts/error-handling-in-nextjs-with-catch-error) work differently — but Arena is an SPA, so this is React's classic [`ErrorBoundary`](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) pattern via `react-error-boundary`.

### 4. Replace the native selects with Base UI

Two `<select>` elements need to go: the gender filter in `PatientList` and the journal status switcher in `JournalEntry`. Swap both for the shared [`Select`](../packages/ui/src/base/select.tsx) primitive from `@medix/ui` (a [Radix](https://www.radix-ui.com/primitives/docs/components/select) wrapper, generated via the [shadcn/ui](https://ui.shadcn.com/docs/components/select) CLI):

```tsx
<Select value={genderFilter} onValueChange={(v) => setGenderFilter(v as GenderFilter)}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    <SelectItem value="male">Male</SelectItem>
    <SelectItem value="female">Female</SelectItem>
  </SelectContent>
</Select>
```

Do the same for the three `JournalStatus` options (`draft`, `active`, `closed`) in `JournalEntry`. Keep the status presentation inside `JournalEntry` — don't extract a separate badge.

> **Why swap the native `<select>`?** Focus, keyboard, and screen-reader behavior vary across browsers and OSes. Radix handles all of that. Accessibility in a healthcare app isn't optional. Base primitives know nothing about your domain — they only handle the hard parts of the browser.

> **What goes in `packages/ui` and what stays in the app?** Shared primitives (Base UI) and real shared product concepts (Step 5's `BrandMark`) belong in `packages/ui`. Journal status presentation only has meaning in this workflow today, so it stays in `JournalEntry`.

### 5. Extract `BrandMark` to `@medix/ui`

The Medix logo and wordmark live in three places: the Arena desktop sidebar, the Arena mobile header, and [`apps/medix.com/app/layout.tsx`](../apps/medix.com/app/layout.tsx). Arena renders it with the `Arena` product context; medix.com renders the bare brand.

Create [`packages/ui/src/BrandMark.tsx`](../packages/ui/src/BrandMark.tsx) and export it from [`packages/ui/src/index.ts`](../packages/ui/src/index.ts):

```tsx
type BrandMarkProps = {
  product?: string
  size?: 'sm' | 'md'
  className?: string
}

export function BrandMark({ product, size = 'md', className }: BrandMarkProps) {
  // <Activity> icon (from lucide-react) + "Medix" wordmark + optional product line
}
```

Use it in `Layout.tsx` (`<BrandMark product="Arena" />`) and in `apps/medix.com/app/layout.tsx` (`<BrandMark />`).

> **Why is `BrandMark` better shared than journal status?** Both apps need the same brand identity — change the logo once, both update. Journal status is one app's workflow; sharing it would force `packages/ui` to know about `JournalStatus`. Drag domain concepts into the shared package only when more than one consumer needs them.

> **Base UI vs. domain UI.** [`Button`](../packages/ui/src/base/button.tsx), [`Card`](../packages/ui/src/base/card.tsx), [`Select`](../packages/ui/src/base/select.tsx) know nothing about Medix. `BrandMark` is domain UI — it encodes the product brand. Both belong in `packages/ui`, but in different layers.

### Verify

```bash
npm run typecheck --workspace=apps/arena
npm test --workspace=apps/arena -- --run
```

Visually: sidebar and mobile header look unchanged; the gender filter and journal status switcher use the new `Select`; `BrandMark` appears in both apps; a thrown error inside the page content shows the fallback while the sidebar stays clickable.

## Bonus

### 1. Compare error boundary placements

Move the boundary so it wraps the whole `<Layout>` instead of only `<main>`. Re-trigger the throw and compare what stays visible.

> The smallest boundary that still lets the user navigate away from the failure. Wrapping the whole layout hides the sidebar — no exit short of a refresh.

### 2. Find one more reusable piece

Pick one UI fragment that feels reusable. Before extracting, compare it with Base UI and `BrandMark`: who would own it, and what kind of change would make it unsafe to share? If only one app uses it, leave it.

## Resources

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Describing the UI](https://react.dev/learn/describing-the-ui)
- [React: Error boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary)
- [Radix `Select`](https://www.radix-ui.com/primitives/docs/components/select) · [shadcn/ui `Select`](https://ui.shadcn.com/docs/components/select)
- [Sharing TypeScript code in a monorepo](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Error handling in Next.js with `catch` error](https://aurorascharff.no/posts/error-handling-in-nextjs-with-catch-error)
