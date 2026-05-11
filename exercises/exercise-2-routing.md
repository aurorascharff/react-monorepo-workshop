# Exercise Two: Routing

## Problem

The app can show different screens, but the browser does not know what screen the user is on. Refresh, back, forward, bookmarks, and copied links should work with the UI instead of fighting it.

## Task

1. Add React Router in SPA mode. Wrap the app in a browser router from [apps/arena/src/main.tsx](../apps/arena/src/main.tsx), then create a route file for `/`, `/patients`, `/patients/:id`, and `*`.

2. Turn the existing Dashboard, Patients, and Patient Detail screens from [apps/arena/src/App.tsx](../apps/arena/src/App.tsx), [apps/arena/src/Dashboard.tsx](../apps/arena/src/Dashboard.tsx), and [apps/arena/src/PatientPage.tsx](../apps/arena/src/PatientPage.tsx) into route pages.

3. Use a layout route for the shared shell so navigation stays visible while the route content changes. The active navigation state should come from the URL.

4. Replace local navigation state with URL-based navigation. Use links for navigation, keep buttons for actions, and read the patient id from the route on the patient detail page.

5. Try refresh, back, forward, copied URLs, direct patient detail URLs, and an unknown URL. The browser should understand where the user is and the app should show the right screen.

## Bonus

1. Lazy-load the route pages and look for separate route chunks in Network when you navigate. Keep the app shell visible while route code is loading.

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
