# Deployment

This is a static site — any static host works. No build step, so you deploy the
repository contents as-is.

## GitHub Pages (recommended)

The repo is already Pages-ready (it includes a `.nojekyll` file so the
`assets/` folder is served verbatim).

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`**, then **Save**.
4. After a minute the site is live at:
   `https://haithameldesouky.github.io/MonsterGym/`

> All internal links and asset paths are relative, so the site works correctly
> from the `/MonsterGym/` sub-path that Pages serves from.

## Other static hosts

| Host | How |
| --- | --- |
| **Netlify** | Drag-and-drop the folder, or connect the repo; no build command, publish directory = repo root |
| **Vercel** | Import the repo; framework preset = "Other"; output dir = root |
| **Cloudflare Pages** | Connect repo; build command = none; output = `/` |
| **Any web server** | Copy the files into the web root (Apache, Nginx, IIS, S3, …) |

## Local preview before deploying

```bash
python -m http.server 8000   # then open http://localhost:8000
```

## Notes

- There is no backend; forms are client-side demos and submit nothing to a
  server. If you later add a backend, point the form handlers in
  `assets/js/app.js` at your API instead of the simulated redirect.
- The contact page embeds Google Maps via a public embed URL (no API key
  required).
