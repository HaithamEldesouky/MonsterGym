# Contributing

Thanks for your interest! This is a small personal learning project, but
improvements are welcome.

## Getting started

1. Fork and clone the repo.
2. Serve it locally — no install needed:
   ```bash
   python -m http.server 8000
   ```
   Open <http://localhost:8000>.
3. Make your change, refresh the browser, and verify it works.

There is **no build step and no dependencies** — it's plain HTML, CSS and
vanilla JavaScript.

## Guidelines

- Follow the conventions in [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md):
  - Page HTML holds only its `<main>` content.
  - Styling goes in `assets/css/styles.css`; behavior in `assets/js/app.js`.
  - Use the CSS design tokens (`var(--brand)`, …) instead of hardcoded values.
  - Keep markup semantic and accessible (labels, `alt` text, `aria-*`).
  - Lowercase, space-free filenames.
- Test the [checklist](docs/DEVELOPMENT.md#testing-checklist) before submitting,
  and make sure the browser console is clean.

## Pull requests

- Keep PRs focused on a single change.
- Describe what changed and how you verified it.
- Update `docs/` and `CHANGELOG.md` if your change affects behavior or structure.

## Reporting issues

Open a GitHub issue with steps to reproduce, what you expected, and what
happened (browser + screenshots help).
