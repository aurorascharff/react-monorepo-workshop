# Module 2: Routing

Work in: `apps/arena`.

## Problem

The app can show different screens, but the browser does not know what screen the user is on. Refresh, back, forward, bookmarks, and copied links should work with the UI instead of fighting it.

## Task

1. Add React Router in SPA mode and create routes for Dashboard, Patients, Patient Detail, and Not Found.

2. Use a layout route for the shared shell so navigation stays visible while the route content changes.

3. Replace local navigation state with URL-based navigation. Use links for navigation, and read the patient id from the route on the patient detail page.

4. Try refresh, back, forward, copied URLs, and opening a patient link in a new tab. The browser should understand where the user is.

## Resources

- [React Router: Routing](https://reactrouter.com/start/declarative/routing)
- [React Router: Navigating](https://reactrouter.com/start/declarative/navigating)
- [React Router: URL values](https://reactrouter.com/start/declarative/url-values)
- [MDN: Links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)
