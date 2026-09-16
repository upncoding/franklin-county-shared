import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3002;

(async () => {
    const server = await createServer({ configFile: path.resolve(__dirname, 'vite.preview.config.ts'), server: { port: PORT } });
    await server.listen();
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await browser.newPage();
    p.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    p.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await p.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });
    await p.waitForSelector('#preview-content', { timeout: 3000 }).catch(e => console.log(e.message));
    await browser.close();
    await server.close();
})();
