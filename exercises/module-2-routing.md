# Module 2: Routing

Work in: `apps/arena`.

## Problem

The app can show different screens, but the browser does not know what screen the user is on. Refresh, back, forward, bookmarks, and copied links should work with the UI instead of fighting it.

## Task

- Move navigation from local component state to browser URLs.
- Give Dashboard, Patients, and Patient Detail their own addresses.
- Keep the shared shell visible while the active page changes.
- Use links for navigation.
- Preserve refresh, back, forward, copied URL, and new-tab behavior.

## Check

- Refresh works on a patient detail page.
- The back button behaves like expected.
- The active navigation item reflects the current route.
- The navigation uses links for navigation, not buttons.
- A patient detail URL can be copied, opened, and shared.

## Resources

- [React Router: Routing](https://reactrouter.com/start/declarative/routing)
- [React Router: Navigating](https://reactrouter.com/start/declarative/navigating)
- [React Router: URL values](https://reactrouter.com/start/declarative/url-values)
- [MDN: Links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)
