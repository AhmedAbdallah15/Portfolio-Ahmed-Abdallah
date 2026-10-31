# Deployment guide

## GitHub Pages

Repository: https://github.com/AhmedAbdallah15/Portfolio-Ahmed-Abdallah

The workflow `.github/workflows/deploy.yml` publishes `main` to GitHub Pages. It installs locked dependencies, builds with Node 24 and deploys only `dist/`. Set repository **Settings > Pages > Source** to **GitHub Actions**. The workflow uses GitHub's managed token; never commit a personal token.

The workflow obtains both `BASE_PATH` and `SITE_URL` from `actions/configure-pages`, so repository pages and root/custom-domain pages receive correct paths automatically. It generates the canonical URL, sitemap, og:url and absolute social image. Hash-based case-study links require no SPA server rewrite.

## Build and preview locally

Default root preview:

```powershell
.\npm.cmd run build
.\npm.cmd run preview
```

To reproduce the repository deployment path:

```powershell
$env:BASE_PATH = '/Portfolio-Ahmed-Abdallah/'
$env:SITE_URL = 'https://ahmedabdallah15.github.io/Portfolio-Ahmed-Abdallah/'
.\npm.cmd run build
.\npm.cmd run preview
```

Use normal `npm run` commands on a fresh Node/npm installation. `BASE_PATH` defaults to `/`; SITE_URL must have a matching pathname, with no query or fragment. Remove these process environment variables to return to a root build.

## Verify a deployment

- Wait for the GitHub Actions workflow to report success.
- Open the returned Pages URL and refresh a direct `#/project/<slug>` link.
- Verify artwork, favicon, social-preview.jpg, sitemap.xml and robots.txt under the same site path.
- Test filters, mobile menu, viewer keyboard/Escape, and contact/profile destinations.
- Run the browser checks with QA_URL set to the actual site URL (including trailing slash).

Only optimized artwork and maintainable source are versioned. Original PDF/JPEG/PNG inputs, extraction records, local tools, QA captures, generated dist and deployment archives are excluded from Git. Keep the original workspace backed up separately. CI does not need the private originals to build.

## Other static hosts

Set the install command to `npm ci`, build to `npm run build`, output directory to `dist`. Configure BASE_PATH for the host path and SITE_URL for the exact public URL. Enable HTTPS and compression. Cache hashed assets long-term and revalidate index.html; purge caches when replacing stable image filenames. Manual upload must contain only dist contents, not the workspace.

Hash-routed projects share the portfolio's initial social metadata/search document. Browser titles/descriptions update for visitors. Separately indexed project URLs would require generating real project HTML routes.
