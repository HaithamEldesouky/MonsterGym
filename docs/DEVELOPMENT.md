# Development guide

There is **no build step and no dependencies** — you edit files and refresh the
browser.

## Running locally

The simplest way is to open `index.html` directly. However, a few features (the
Google Maps embed, and consistent relative-path behavior) work best over HTTP.
Serve the folder with any static server:

```bash
# Python 3 (no install needed on most systems)
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Then visit <http://localhost:8000>.

## Project conventions

- **One concern per file:** page HTML holds only its `<main>` content; styling
  lives in `assets/css/styles.css`; behavior lives in `assets/js/app.js`.
- **No inline styles or inline `onclick`** — attach behavior in `app.js`.
- **Use the design tokens.** Reference `var(--brand)`, `var(--surface)`, etc.
  instead of hardcoding colors, so theming keeps working.
- **Filenames are lowercase and space-free.**
- **Accessibility:** every image has meaningful `alt` text (or `alt=""` if
  decorative), form inputs have `<label>`s, and interactive controls have
  `aria-label`s where needed.

## Adding a new page

1. Copy an existing page (e.g. `about.html`) as your starting template.
2. Set `<body data-page="...">`. To highlight it in the nav, add a matching
   entry to the `NAV_LINKS` array in `assets/js/app.js`.
3. Keep the three structural elements:
   ```html
   <div id="site-header"></div>
   <main> ... </main>
   <div id="site-footer"></div>
   <script src="assets/js/app.js" defer></script>
   ```
4. Put any page-specific behavior behind a new `init*()` function in `app.js`
   that early-returns if its target element isn't present, then call it from the
   `DOMContentLoaded` handler.

## Adding a gallery photo

1. Drop the image in `assets/img/gallery/`.
2. Add a `<figure><img src="assets/img/gallery/NN.jpeg" alt="..."></figure>`
   entry inside `#galleryGrid` in `gallery.html`. The lightbox picks it up
   automatically.

## Theming

Edit the custom properties at the top of `assets/css/styles.css`:

```css
:root {
  --brand: #16a34a;   /* change the accent color here */
  ...
}
[data-theme="dark"] { ... }  /* dark-mode overrides */
```

## Testing checklist

Before committing, click through:

- [ ] Nav links + mobile hamburger menu
- [ ] Theme toggle persists after refresh
- [ ] Each form: empty submit shows errors; valid submit shows a toast
- [ ] Gallery lightbox opens, navigates (arrows/keyboard) and closes
- [ ] Booking price updates when changing the plan
- [ ] No errors in the browser console
