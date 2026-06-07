# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-06-07

A complete modern rebuild, keeping the plain HTML / CSS / JavaScript base (no
frameworks, no build step).

### Added
- Mobile-first **responsive layout** (flexbox & grid) with a collapsible mobile
  navigation menu.
- **Dark / light theme** toggle, persisted in `localStorage`.
- **Semantic HTML5** structure with accessible labels and image `alt` text.
- **Shared header & footer** injected from a single source (`assets/js/app.js`).
- **Inline, real-time form validation** (email regex, password match, show/hide
  password) replacing `alert()`-based checks.
- **Interactive gallery** with a keyboard-navigable lightbox.
- **Live booking price** summary on the membership form.
- **Google Maps embed** on the contact page.
- Project documentation: this changelog, `README`, `docs/`, `CONTRIBUTING`,
  `LICENSE`.

### Changed
- Reorganized assets into `assets/{css,js,img}` with lowercase, space-free
  filenames.
- Consolidated duplicated "logged-in vs logged-out" pages into a single,
  consistent set of pages.
- Moved all styling into one tokenized stylesheet; removed per-page inline
  `<style>` blocks and fixed pixel-positioning.

### Fixed
- Sign-up **gender radio labels were swapped** (the "Male" label was tied to the
  `female` value) — corrected.
- A gallery image had a **leading space in its path** (`" image 7.jpeg"`) and
  never loaded — fixed.
- Admin login linked to **`Admin panel.html`** (wrong casing) — fixed.
- Smart-quote **encoding artifacts** (`�`) in the About copy — cleaned up.

### Removed
- Committed Visual Studio metadata (`.vs/`) and deprecated HTML
  (`<center>`, `align=`, `background=` attributes).

## [1.0.0] - 2020-11-30

Original version, built while learning front-end web development.

### Added
- Static gym website: landing, home, about, gallery (slideshow), contact,
  login, sign-up, booking, and a basic admin login + panel.
- Client-side form validation in `validation.js`, `validation2.js`,
  `booking.js`.

[2.0.0]: https://github.com/HaithamEldesouky/MonsterGym/releases/tag/v2.0.0
[1.0.0]: https://github.com/HaithamEldesouky/MonsterGym/releases/tag/v1.0.0
