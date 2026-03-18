import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', err => errors.push(err.message));
const resp = await page.goto('http://localhost:3000/', { timeout: 30000, waitUntil: 'networkidle' });
console.log(`Status: ${resp.status()}`);
if (errors.length) { console.log(`ERRORS (${errors.length}):`); errors.forEach(e => console.log('  ' + e)); }
else console.log('No errors!');
await browser.close();
