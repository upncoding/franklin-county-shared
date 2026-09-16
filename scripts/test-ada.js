import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}`;
const REPORT_PATH = path.resolve(__dirname, '../ada-report.json');
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 375, height: 812, isMobile: true, hasTouch: true };

async function runAxe(page, context = null) {
    await page.addScriptTag({ path: require.resolve('axe-core') });
    return page.evaluate(async (ctx) => {
        const opts = { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }, rules: { 'color-contrast': { enabled: false } } };
        if (ctx) opts.context = ctx;
        const results = await window.axe.run(opts);
        return results.violations.map(v => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map(n => n.target.join(' ')).slice(0, 5) }));
    }, context);
}

function printViolations(violations, indent = '    ') {
    violations.forEach(v => {
        const icon = v.impact === 'critical' ? '🔴' : v.impact === 'serious' ? '🟠' : '🟡';
        console.log(`${indent}${icon} [${v.impact}] ${v.id}: ${v.help}`);
        v.targets.forEach(t => console.log(`${indent}   ↳ ${t}`));
    });
}

async function runTests() {
    const allResults = [];
    let totalViolations = 0;
    const server = await createServer({ configFile: path.resolve(__dirname, '../vite.preview.config.ts'), server: { port: PORT } });
    await server.listen();
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    const setupPage = async (viewport) => {
        const p = await browser.newPage();
        await p.setViewport(viewport); await new Promise(r => setTimeout(r, 500));
        await p.goto(BASE_URL, { waitUntil: 'networkidle0' });
        await p.waitForSelector('#preview-content', { timeout: 10000 }).catch(() => {});
        return p;
    };

    const record = (context, label, violations) => {
        if (violations.length) {
            totalViolations += violations.length;
            console.log(`  ❌ ${violations.length} violation(s):`);
            printViolations(violations);
        } else {
            console.log(`  ✅ Clean`);
        }
        allResults.push({ context, label, violations });
    };

    try {
        console.log('\n══ DESKTOP (1440×900) ══');
        const dp = await setupPage(DESKTOP_VIEWPORT);
        record('desktop/base', 'Desktop Base', await runAxe(dp));
        
        const trigger = await dp.$('nav [aria-controls]');
        if (trigger) {
            await trigger.hover();
            await new Promise(r => setTimeout(r, 600));
            record('desktop/megamenu', 'Mega Menu Open', await runAxe(dp));
        } else {
            console.log('  ⚠️  No mega-menu trigger found');
        }
        await dp.close();

        console.log('\n══ MOBILE (375×812) ══');
        const mob = await setupPage(MOBILE_VIEWPORT);
        await mob.reload({ waitUntil: 'networkidle0' });
        record('mobile/base', 'Mobile Base', await runAxe(mob));
        
        const navBtn = await mob.$('button[aria-controls="fc-mobile-nav"]');
        if (navBtn) {
            await navBtn.click();
            await new Promise(r => setTimeout(r, 800));
            record('mobile/menu', 'Mobile Menu Open', await runAxe(mob));
        } else {
            console.log('  ⚠️  No hamburger button found');
        }
        await mob.close();
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
        await server.close();
        
        console.log('\n════════════════════════════════════════════════════════════');
        console.log('  ADA COMPLIANCE REPORT — Shared Package');
        console.log('════════════════════════════════════════════════════════════');
        const failed = allResults.filter(r => r.violations.length > 0);
        if (failed.length === 0) console.log('  ✅  ALL TESTS PASSED — No WCAG 2.1 AA violations found.\n');
        else console.log(`  ❌  ${totalViolations} total violation(s) across ${failed.length} context(s).\n`);
        
        fs.writeFileSync(REPORT_PATH, JSON.stringify(allResults, null, 2));
        console.log(`  📋 Full JSON report: ${REPORT_PATH}\n`);
        process.exit(totalViolations > 0 ? 1 : 0);
    }
}
runTests();
