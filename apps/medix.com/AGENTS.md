# medix.com — Agent Instructions

## Purpose

`apps/medix.com` is the public Next.js marketing site — same component library as `apps/arena`, different rendering model (server-rendered, SEO-optimized).

## Structure

- `app/` — Next.js App Router
- `app/layout.tsx` — sticky header, footer, shared shell
- `app/page.tsx` — landing
- `app/products`, `app/customers`, `app/contact`, `app/about` — marketing pages
- `app/globals.css` — Tailwind v4 + theme tokens (mirrors `apps/arena`)

## Rules

1. Optimize for public rendering, crawlability, and fast first load.
2. **Public-only.** No patient or journal data. No authenticated workflows.
3. Prefer Server Components and static generation. Only opt into client components when interactivity demands it.
4. Use shared primitives from `@medix/ui`. Do not redefine `Button`, `Card`, and other base components.
5. Marketing copy is in English. Match the visual language of `apps/arena` (warm stone + emerald theme).

## Validation

```bash
npm run lint --workspace=apps/medix.com
npm run build --workspace=apps/medix.com
```
