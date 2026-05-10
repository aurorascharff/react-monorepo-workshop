# Module 2: Routing

Goal: make the URL describe what the user is looking at.

Work in `apps/arena`.

## Exercise

Change the app so navigation is represented in the browser URL instead of only in local component state.

The dashboard, patient list, and patient detail views should each have their own address. The shared shell should stay consistent while the active page changes.

## Check Your Work

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
