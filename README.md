# 🏋️ Monster Gym

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A modern, responsive front-end website for a fictional gym — **"Go hard or go home."**

> Originally built in 2020 as one of my first web-development projects, then fully
> rebuilt in 2025 with modern, semantic, responsive HTML/CSS/JavaScript.
> See the [v1.0.0 release](../../releases/tag/v1.0.0) for the original version.

## ✨ Features

- **Responsive design** — mobile-first layout with a collapsible navigation menu, works on phones, tablets and desktops.
- **Dark / light theme** toggle, remembered across visits via `localStorage`.
- **Semantic HTML5** — `header`, `nav`, `main`, `section`, `footer` with accessible labels and alt text.
- **Shared layout** — header and footer are injected from a single source (`assets/js/app.js`), so there's no duplicated markup.
- **Modern forms** with inline, real-time validation (proper email regex, password match, show/hide password) instead of intrusive `alert()` popups.
- **Interactive gallery** with a keyboard-navigable lightbox.
- **Booking flow** with a live price summary and selectable membership plans.
- **Google Maps embed** on the contact page.
- No build step required — it's pure HTML, CSS and vanilla JavaScript.

## 📂 Project structure

```
.
├── index.html          # Landing page (hero, reasons, features, CTA)
├── about.html          # About us
├── gallery.html        # Photo gallery + lightbox
├── booking.html        # Membership plans + booking form
├── contact.html        # Contact details + map
├── login.html          # Sign in
├── signup.html         # Create account
├── admin-login.html    # Admin sign in
├── admin.html          # Admin dashboard
└── assets/
    ├── css/styles.css  # All styling (design tokens + components)
    ├── js/app.js       # Nav, theme, forms, gallery
    └── img/            # Logo, icons, wallpapers, gallery photos
```

## 📚 Documentation

Detailed docs live in the [`docs/`](docs/) folder:

- [Architecture](docs/ARCHITECTURE.md) — how the site is structured (shared shell, theming, forms)
- [Pages reference](docs/PAGES.md) — every page, the navigation graph and each form's fields/rules
- [Development guide](docs/DEVELOPMENT.md) — running locally, conventions, adding a page
- [Deployment](docs/DEPLOYMENT.md) — GitHub Pages and other static hosts
- [Changelog](CHANGELOG.md) · [Contributing](CONTRIBUTING.md)

## 🚀 Running it

It's a static site, so just open `index.html` in a browser.

For the best experience (so the map embed and relative paths behave like in production), serve it locally:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Deployment

This site is deployment-ready for **GitHub Pages** — enable Pages on the `main`
branch and it will be served from the repository root.

## 📝 Note

This is a **front-end demo**. Login, sign-up, booking and admin actions are
client-side only — there is no backend, and no real data is stored or processed.

## 🛠️ Built with

HTML5 · CSS3 (custom properties, flexbox, grid) · Vanilla JavaScript (ES6)

## 📄 License

Released under the [MIT License](LICENSE). © 2020-2026 Haitham Eldesouky.
