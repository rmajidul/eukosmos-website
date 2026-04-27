# eukosmos-website

The official website for [EuKosmos](https://eukosmos.com) — an all-in-one academic research manager.

## Structure

```
eukosmos-website/
├── index.html          ← Landing page
├── css/
│   └── style.css       ← Complete design system
├── js/
│   └── main.js         ← Interactions & animations
├── assets/             ← Images, icons, og-image
├── docs/               ← Documentation pages
├── _redirects          ← Cloudflare Pages routing
├── _headers            ← Security & cache headers
└── README.md
```

## Deployment

This site deploys automatically to Cloudflare Pages on every push to `main`.

**Live:** https://eukosmos.com

## Adding new sections

The site is modular. Each section in `index.html` is a self-contained `<section>` block. To add a new section:

1. Add the HTML block in `index.html`
2. Add CSS in `css/style.css` (follow the existing naming conventions)
3. Add interactivity in `js/main.js` if needed
4. Push — deploys automatically

## Design system

- **Display font:** Cormorant Garamond (serif, academic feel)
- **Body font:** DM Sans (clean, modern)
- **Code font:** JetBrains Mono
- **Primary colour:** `#33d9ff` (matches EuKosmos app)
- **Background:** `#05080f`

All CSS variables are defined in `:root` at the top of `style.css`.

## Local development

Just open `index.html` in a browser. No build step required.

Or use a simple local server:
```bash
python3 -m http.server 3000
# Open http://localhost:3000
```
