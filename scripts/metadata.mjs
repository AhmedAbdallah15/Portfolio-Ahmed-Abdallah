import { readFile, writeFile } from 'node:fs/promises';

const supplied = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';
let html = await readFile('dist/index.html', 'utf8');
if (supplied) {
  const url = new URL(supplied);
  if (!['https:', 'http:'].includes(url.protocol) || url.search || url.hash || url.username || url.password) throw new Error('SITE_URL must be a public HTTP(S) website URL without credentials, query or fragment.');
  const pathname = `${url.pathname.replace(/\/$/, '')}/`;
  if (pathname !== base) throw new Error(`SITE_URL path ${pathname} must match BASE_PATH ${base}.`);
  const site = `${url.origin}${pathname}`;
  const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, (_, before, after) => `${before}${escape(site)}social-preview.jpg${after}`)
    .replace('</head>', `<link rel="canonical" href="${escape(site)}" /><meta property="og:url" content="${escape(site)}" /></head>`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(site)}</loc></url></urlset>`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
  console.log(`Canonical, sitemap and social URL configured for ${site}.`);
} else {
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, (_, before, after) => `${before}${base}social-preview.jpg${after}`);
  await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
  console.log('No SITE_URL set: domain-dependent metadata deferred until deployment.');
}
await writeFile('dist/index.html', html);
