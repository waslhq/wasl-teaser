// Tiny static dev server. `npm run dev` serves src/; `npm start` serves dist/.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const useDist = process.argv.includes('--dist');
const root = fileURLToPath(new URL(useDist ? '../dist/' : '../src/', import.meta.url));
const port = Number(process.env.PORT) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json'
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent((req.url || '/').split('?')[0]);
    if (path === '/' || path.endsWith('/')) path += 'index.html';
    const filePath = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': TYPES[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>');
  }
});

server.listen(port, () => {
  console.log(`wasl-teaser dev server → http://localhost:${port}  (serving ${useDist ? 'dist' : 'src'}/)`);
});
