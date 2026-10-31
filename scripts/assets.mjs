import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';

await mkdir('public/images', { recursive: true });
const files = (await readdir('source/assets')).filter(f => /\.(png|jpe?g)$/i.test(f));
const manifest = {};
let originalBytes = 0, webBytes = 0, generated = 0, reused = 0;
for (const file of files) {
  const id = file.replace(/\.(png|jpe?g)$/i, '');
  if (manifest[id]) throw new Error(`Duplicate asset identifier: ${id}`);
  const input = `source/assets/${file}`;
  const inputStat = await stat(input);
  const { width, height } = await sharp(input).metadata();
  const sizes = [...new Set([480, 960, Math.min(1440, width)].filter(w => w <= width))].sort((a,b) => a-b);
  const variants = [];
  for (const size of sizes) {
    const path = `/images/${id}-${size}.webp`;
    const previous = await stat(`public${path}`).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (!previous || previous.mtimeMs < inputStat.mtimeMs) {
      await sharp(input).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(`public${path}`);
      generated++;
    } else reused++;
    webBytes += (await stat(`public${path}`)).size;
    variants.push({ width: size, path });
  }
  originalBytes += inputStat.size;
  manifest[id] = { width, height, src: variants.at(-1).path, srcSet: variants.map(v => `${v.path} ${v.width}w`).join(', ') };
}
await writeFile('src/assets.json', JSON.stringify(manifest, null, 2));
await import('./social-preview.mjs');
await writeFile('source/web-asset-report.json', JSON.stringify({ images: files.length, originalBytes, webBytes, generated: new Date().toISOString() }, null, 2));
console.log(`Optimized ${files.length} originals: ${(originalBytes/1e6).toFixed(2)} MB → ${(webBytes/1e6).toFixed(2)} MB. Generated ${generated} variants; reused ${reused} unchanged variants.`);
