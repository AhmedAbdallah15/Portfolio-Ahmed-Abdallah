import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';

// Pre-render the real React home page for crawlers and a readable initial document.
// Fragment-based case studies resolve after hydration; no separate server is needed.
const server = await createServer({
  appType: 'custom', cacheDir: '.tools/ssr-cache',
  server: { middlewareMode: true, hmr: false },
});
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { profile } = await server.ssrLoadModule('/src/content.ts');
  const markup = renderToString(createElement(App));
  const html = await readFile('dist/index.html','utf8');
  const schema = { '@context':'https://schema.org', '@type':'Person', name:profile.name, jobTitle:profile.role, description:profile.introduction, email:profile.email, telephone:profile.phoneHref.replace('tel:',''), sameAs:profile.socials.map(social => social.url) };
  await writeFile('dist/index.html',html.replace('<div id="root"></div>',`<div id="root">${markup}</div>`).replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`));
  if (!markup.includes('Ideas made') || !markup.includes('Canal Pediatric Conference')) throw new Error('Pre-rendered content is incomplete');
  console.log('Pre-rendered complete home content and Person structured data.');
} finally {
  await server.close();
}
