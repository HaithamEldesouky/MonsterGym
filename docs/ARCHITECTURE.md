# Architecture

How the Monster Gym site is put together. It's a **static**, framework-free site —
plain HTML, CSS and vanilla JavaScript with no build step.

## Big picture

```
Browser
  │
  ├─ <page>.html          ← page-specific content only (in <main>)
  │     │
  │     ├─ assets/css/styles.css   ← all styling (design tokens + components)
  │     └─ assets/js/app.js        ← shared behavior, injected chrome, page logic
  │
  └─ assets/img/...        ← logo, icons, wallpapers, gallery photos
```

Every page is a thin HTML file that contains only its own `<main>` content. The
shared **header** and **footer** are *not* duplicated in each file — they are
generated once in JavaScript and injected at runtime. This keeps navigation and
branding consistent across the whole site from a single source of truth.

## The shared shell (`assets/js/app.js`)

`app.js` is wrapped in an IIFE (`(function () { ... })()`) so it leaks nothing
into the global scope. It runs in two phases:

1. **Immediately** (before `DOMContentLoaded`): `initTheme()` applies the saved
   light/dark theme so there is no flash of the wrong theme. (A tiny inline
   script in each page's `<head>` does the same thing even earlier, for the very
   first paint.)
2. **On `DOMContentLoaded`**: everything else is wired up.

Key responsibilities:

| Function | Purpose |
| --- | --- |
| `buildHeader()` / `buildFooter()` | Return the HTML for the shared chrome |
| `initChrome()` | Inject header/footer into `#site-header` / `#site-footer`, wire the theme toggle and the mobile menu |
| `initTheme()` / `applyTheme()` | Read/write the theme from `localStorage` (`mg-theme`) |
| `toast()` | Show a transient confirmation message |
| `initLoginForm()` etc. | Per-page form validation (only attach if the form exists) |
| `initGallery()` | Build the lightbox and wire image clicks + keyboard nav |
| `initReveal()` | Fade-in-on-scroll via `IntersectionObserver` |

Each `init*` function first checks whether its target element exists and bails
out early if not, so the same `app.js` can be safely loaded on every page.

### How a page declares itself

```html
<body data-page="gallery">
  <div id="site-header"></div>
  <main> ... page content ... </main>
  <div id="site-footer"></div>
  <script src="assets/js/app.js" defer></script>
</body>
```

`data-page` tells `buildHeader()` which nav link to mark `active`. The two empty
`<div>`s are the injection points for the header and footer.

## Styling (`assets/css/styles.css`)

The stylesheet is organized as:

1. **Design tokens** — CSS custom properties on `:root` (colors, spacing,
   radius, fonts) with a `[data-theme="dark"]` override block. Change the brand
   color or theme in one place.
2. **Base/reset** — element defaults.
3. **Components** — buttons, header/nav, hero, cards, forms, gallery, lightbox,
   contact, admin, toast, footer.
4. **Responsive** — mobile-first base styles with `@media` breakpoints at
   960px / 760px / 460px, plus a `prefers-reduced-motion` block.

Theming works entirely through the custom properties: components reference
`var(--surface)`, `var(--text)`, etc., and the dark theme just redefines those
variables.

## Forms

All forms are **client-side only** — there is no backend. Validation lives in
`app.js` and shows inline error messages (no `alert()` pop-ups):

- A shared email regex (`EMAIL_RE`) and `setError()` / `clearError()` helpers.
- On a valid submit, a `toast()` is shown and the page redirects after a short
  delay to simulate success.

See [PAGES.md](PAGES.md) for the fields and rules of each form.

## Why no framework / build step?

This started as a learning project and is intentionally kept dependency-free:
open `index.html` and it runs. That makes it trivial to host (any static host or
GitHub Pages) and easy to read end-to-end. See [DEPLOYMENT.md](DEPLOYMENT.md).
