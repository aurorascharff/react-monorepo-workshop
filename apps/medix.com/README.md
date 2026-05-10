# medix.com

medix.com is the public Next.js marketing site. It uses the same shared UI package as Arena, but it has a different rendering model and audience.

## Run

```bash
npm run dev --workspace=apps/medix.com
npm run typecheck --workspace=apps/medix.com
npm run build --workspace=apps/medix.com
```

The site runs on `http://localhost:3000`.

## Structure

```text
app/
  _components/  - components local to the marketing site
  layout.tsx    - shared shell
  page.tsx      - landing page
  products/     - product page
  customers/    - customer page
  contact/      - contact page
  about/        - about page
```

## Notes

Use this app for public content, SEO-oriented pages, and server-rendered or pre-rendered HTML.
