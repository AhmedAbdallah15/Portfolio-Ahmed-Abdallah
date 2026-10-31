# Ahmed Abdallah — Graphic Design Portfolio

A responsive, animated dark portfolio showcasing conference identities, medical congress visuals and print/digital campaigns. Includes 14 case studies, 15 key visuals and 46 authentic artworks, with keyboard-accessible galleries and reduced-motion support.

## Develop locally

Requires Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

On the original Windows workspace, `npm.cmd` uses the available project-local npm installation without changing PowerShell execution policy. On a fresh clone with Node installed, use ordinary npm.

## Content and design

- `src/content.ts`: profile, social links, project descriptions, categories and gallery captions.
- `src/assets.json`: image metadata and responsive image sources.
- `public/images/`: optimized artwork variants included in this repository.
- `src/components/`: existing home, navigation, projects, capability tabs and artwork viewer.
- `src/hooks/usePortfolioMotion.ts`: progressive scroll and pointer enhancements.
- `src/styles.css`: dark design tokens, layout and responsive/reduced-motion rules.

Original PDFs, source JPEG/PNG files, extraction records, local tooling and generated archives stay outside version control. Keep your own backup of originals. `npm run assets` requires the private original source/assets folder; normal development and CI builds use the optimized public files and do not require originals.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes pushes to `main`. Repository **Settings → Pages → Source** must be **GitHub Actions**. The workflow derives the site address and repository subpath from GitHub automatically; no secret token needs to be committed.

Vite uses `BASE_PATH` (default `/`). `SITE_URL` sets canonical, sitemap and social-image URLs and must match the same path. Root sites and project subpaths are supported. See DEPLOYMENT_GUIDE.md.

## Verification

With a production preview running:

```sh
npm run test:browser
npm run test:motion
```

QA uses Playwright with an installed Chromium-compatible browser. Set `BROWSER_PATH` to its executable and `QA_URL` to the preview/deployed site when needed. The original Windows workspace defaults to installed Brave. The site supports keyboard controls, touch layouts and operating-system reduced-motion preferences.

Contact links and public professional profiles are supplied by the portfolio owner. Artwork and portfolio content remain the property of their respective rights holders.
