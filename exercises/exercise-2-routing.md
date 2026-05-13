# Exercise Two: Routing

## Problem

The app can show different screens, but the browser does not know what screen the user is on. Refresh, back, forward, bookmarks, and copied links all depend on the URL.

## Task

If your structure differs from the reference files, make the same kind of change in the equivalent place in your app.

1. Add React Router in SPA mode. Wrap the app in a browser router from [apps/arena/src/main.tsx](../apps/arena/src/main.tsx), then create routes for `/`, `/patients`, `/patients/:id`, and `*`.

2. Turn the existing Dashboard, Patients, and Patient Detail screens into route pages — the dashboard view, the patient list, and the selected-patient detail. Add a simple Not Found page for the `*` route.

3. Use a layout route so the sidebar and header stay mounted across pages. Navigation should live in the layout, and the active link should come from the URL.

4. Replace local navigation state with URL-based navigation. Use links for navigation, keep buttons for actions, and use the patient id from the route on the patient detail page.

5. Try refresh, back, forward, copied URLs, direct patient detail URLs, and an unknown URL.

## Bonus

1. Lazy-load the route pages and look for separate route chunks in Network when you navigate.

2. Put the patient search and gender filter in the URL search params so a filtered patient list can be copied, refreshed, and shared.

## Resources

- [React Router: Routing](https://reactrouter.com/start/declarative/routing)
- [React Router: Navigating](https://reactrouter.com/start/declarative/navigating)
- [React Router: URL values](https://reactrouter.com/start/declarative/url-values)
- [React Router: Search params](https://reactrouter.com/api/hooks/useSearchParams)
- [React: lazy](https://react.dev/reference/react/lazy)
- [React: Suspense](https://react.dev/reference/react/Suspense)
- [MDN: Links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)
- [MDN: Button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
