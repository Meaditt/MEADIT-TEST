import { chromium } from 'playwright';

const pages = ['/', '/about', '/book', '/agents', '/start', '/blog', '/stories', '/privacy', '/terms'];
const browser = await chromium.launch();
const context = await browser.newContext();

for (const path of pages) {
  const page = await context.newPage();
  const errors = [];
  const warnings = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  
  try {
    const resp = await page.goto(`http://localhost:3000${path}`, { timeout: 15000, waitUntil: 'networkidle' });
    console.log(`\n=== ${path} === Status: ${resp.status()}`);
    if (errors.length) console.log('  ERRORS:', errors.join('\n  '));
    if (warnings.length) console.log('  WARNINGS:', warnings.slice(0,3).join('\n  '));
    
    const brokenImages = await page.evaluate(() => {
      return [...document.querySelectorAll('img')].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src);
    });
    if (brokenImages.length) console.log('  BROKEN IMAGES:', brokenImages.join(', '));
  } catch (e) {
    console.log(`\n=== ${path} === FAILED: ${e.message}`);
  }
  await page.close();
}

await browser.close();
