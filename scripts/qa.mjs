import { chromium, devices } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.QA_URL || 'http://127.0.0.1:4173/';
const executablePath = process.env.BROWSER_PATH || 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe';
const browser = await chromium.launch({ executablePath, headless: true });
await mkdir('qa/screenshots', { recursive: true });
const report = { base, timestamp: new Date().toISOString(), viewports: [], projects: [], checks: [], errors: [], failedRequests: [], accessibility: [], performance: {} };
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', e => report.errors.push(e.message));
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
page.on('requestfailed', request => report.failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
page.on('response', response => { if (response.status() >= 400) report.failedRequests.push({ url: response.url(), status: response.status() }); });
const check = (name, condition) => { assert.ok(condition, name); report.checks.push(name); };

async function loadAllImages() {
  // Trigger only the browser's normal lazy-loading behavior, then explicitly decode before visual capture.
  await page.evaluate(async () => {
    const step = innerHeight;
    for (let y=0; y<document.documentElement.scrollHeight; y+=step) { scrollTo(0,y); await new Promise(resolve=>setTimeout(resolve,35)); }
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    scrollTo(0,0);
  });
  return page.evaluate(() => [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src));
}
async function axe(label) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  report.accessibility.push({ label, violations: result.violations.map(v => ({ id:v.id, impact:v.impact, description:v.description, nodes:v.nodes.map(n=>({html:n.html, summary:n.failureSummary})) })) });
}

try {
  const response = await page.goto(base, { waitUntil:'networkidle' });
  check('Production home responds 200', response.status() === 200);
  check('Home has one h1', await page.locator('h1').count() === 1);
  check('All 14 project families visible', await page.locator('.project-card').count() === 14);
  check('Every home section link targets a real element',await page.locator('a[href^="#"]:not([href^="#/"])').evaluateAll(links=>links.every(a=>document.getElementById(a.getAttribute('href').slice(1)))));
  check('Email is user-supplied', await page.locator('a[href="mailto:ahmedabdallah0100152@gmail.com"]').count() >= 1);
  check('Telephone is normalized correctly', await page.locator('a[href="tel:+201158391166"]').count() === 1);
  check('Home images decode', (await loadAllImages()).length === 0);
  await page.screenshot({ path:'qa/screenshots/home-desktop.png', fullPage:true });
  await axe('home-desktop');
  const links = await page.locator('.project-card-link').evaluateAll(els => els.map(e => ({ href:e.getAttribute('href'), title:e.querySelector('h3').textContent })));
  for (const [category, count] of [['Medical congresses',7],['Pediatric stories',4],['Destination & place',3]]) {
    await page.getByRole('button', { name:category, exact:true }).click();
    check(`${category} filter shows ${count} projects`, await page.locator('.project-card').count() === count);
  }
  await page.getByRole('button', { name:/All work/ }).click();
  check('All filter restores 14', await page.locator('.project-card').count() === 14);
  for (const width of [320,375,390,768,1024,1440,1920]) {
    await page.setViewportSize({width,height:900});
    await page.evaluate(()=>scrollTo(0,0));
    const overflow = await page.evaluate(()=>document.documentElement.scrollWidth > innerWidth);
    const clipping = await page.locator('h1').evaluate(e=>e.getBoundingClientRect().right > innerWidth);
    check(`Home ${width}px no horizontal overflow or clipped heading`, !overflow && !clipping);
    report.viewports.push({width,overflow,clipping});
    if(width>=700){
      const alignment=await page.locator('.project-card').evaluateAll(cards=>{
        const boxes=cards.map(card=>({card:card.getBoundingClientRect(),canvas:card.querySelector('.project-canvas').getBoundingClientRect(),title:card.querySelector('.project-title-line').getBoundingClientRect()}));
        return boxes.every((box,index)=>index%2!==0||!boxes[index+1]||Math.abs(box.card.top-boxes[index+1].card.top)<1&&Math.abs(box.canvas.width-boxes[index+1].canvas.width)<1&&Math.abs(box.canvas.height-boxes[index+1].canvas.height)<1&&Math.abs(box.title.top-boxes[index+1].title.top)<1);
      });
      check(`Selected Work ${width}px equal columns, image frames and title alignment`,alignment);
    }

    if (width===320 || width===390 || width===768) { await loadAllImages(); await page.screenshot({path:`qa/screenshots/home-${width}.png`,fullPage:true}); }
    if (width===320) {
      await page.getByRole('button',{name:'Open navigation'}).click();
      check('Mobile menu opens',await page.getByRole('navigation').isVisible());
      await page.keyboard.press('Escape');
      check('Escape closes mobile menu and restores focus', await page.getByRole('button',{name:'Open navigation'}).evaluate(e=>document.activeElement===e));
      await page.getByRole('button',{name:'Open navigation'}).click();
      await page.getByRole('navigation').getByRole('link',{name:'About',exact:true}).click();
      check('Mobile menu link navigates and closes',await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded')==='false' && new URL(page.url()).hash==='#about');
      await axe('home-mobile');
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  for (const deviceName of ['iPhone 13','Pixel 7']) {
    const touchContext = await browser.newContext({...devices[deviceName],reducedMotion:'reduce'});
    const touchPage = await touchContext.newPage();
    touchPage.on('pageerror',e=>report.errors.push(`${deviceName}: ${e.message}`));
    await touchPage.goto(base,{waitUntil:'networkidle'});
    await touchPage.getByRole('button',{name:'Open navigation'}).tap();
    await touchPage.getByRole('navigation').getByRole('link',{name:'About',exact:true}).tap();
    check(`${deviceName} touch menu navigation`,new URL(touchPage.url()).hash==='#about' && await touchPage.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded')==='false');
    check(`${deviceName} touch layout has no overflow`,await touchPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await touchContext.close();
  }
  let galleryTotal=0;
  const uniqueArtworks = new Set();
  for (const link of links) {
    await page.goto(base+link.href,{waitUntil:'networkidle'});
    await page.locator('#case-heading').waitFor();
    check(`${link.title} direct route and title`,(await page.title()).includes(link.title));
    check(`${link.title} has one h1`,await page.locator('h1').count()===1);
    const count=await page.locator('.gallery-grid figure').count(); galleryTotal+=count;
    const artworkIds = await page.locator('.gallery-grid img').evaluateAll(images=>images.map(i=>i.getAttribute('src').match(/\/images\/(.+)-\d+\.webp$/)[1]));
    artworkIds.forEach(id=>uniqueArtworks.add(id));
    check(`${link.title} images decode`,(await loadAllImages()).length===0);
    report.projects.push({title:link.title,artworks:count});
    const first=page.locator('.gallery-image').first();
    await first.click();
    await page.getByRole('dialog').waitFor();
    check(`${link.title} artwork viewer opens`,await page.getByRole('dialog').isVisible());
    if(link.title==='EFNCC'){for(let tab=0;tab<8;tab++)await page.keyboard.press('Tab');check('Native modal contains keyboard focus',await page.getByRole('dialog').evaluate(e=>e.contains(document.activeElement)));}
    if(count>1){await page.keyboard.press('ArrowRight');check(`${link.title} arrow-key artwork navigation`,(await page.locator('.lightbox-count').innerText()).startsWith('2 /'));await page.keyboard.press('ArrowLeft');}
    if(link.title==='EFNCC'){
      await axe('project-and-modal-desktop');
      await page.locator('.lightbox-stage img').evaluate(i=>i.decode());
      await page.screenshot({path:'qa/screenshots/artwork-viewer-desktop.png'});
    }
    await page.keyboard.press('Escape');
    check(`${link.title} viewer Escape and focus restore`,await page.getByRole('dialog').count()===0 && await first.evaluate(e=>document.activeElement===e));
    if(link.title==='EFNCC'){
      await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
      await page.screenshot({path:'qa/screenshots/efncc-desktop.png',fullPage:true});
      await axe('project-desktop');
    }
    for(const width of [320,768]){
      await page.setViewportSize({width,height:900});
      check(`${link.title} ${width}px no horizontal overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    }
    if(link.title==='Canal Pediatric Conference'){
      await page.setViewportSize({width:390,height:844});await loadAllImages();
      await page.screenshot({path:'qa/screenshots/canal-mobile.png',fullPage:true});
      await page.locator('.gallery-image').first().click();await page.getByRole('dialog').waitFor();
      await axe('project-and-modal-mobile');
      await page.screenshot({path:'qa/screenshots/artwork-viewer-mobile.png'});
      await page.getByRole('button',{name:'Close artwork viewer'}).click();
    }
    await page.setViewportSize({width:1440,height:1000});
  }
  check('All 46 unique original artworks represented in project galleries',galleryTotal===46 && uniqueArtworks.size===46);
  await page.goto(base+'#/project/pediascape',{waitUntil:'networkidle'});
  check('Pediascape retains both original moods',await page.locator('.gallery-grid figure').count()===2);
  // Stub only the browser clipboard boundary to avoid changing the user's OS clipboard.
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.__qaCopiedText=text;}}}));
  await page.getByRole('button',{name:'Copy project link'}).click();
  check('Share action copies the current project URL',await page.evaluate(()=>window.__qaCopiedText===location.href));
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('Test clipboard denied');}}}));
  await page.getByRole('button',{name:'Project link copied'}).click();
  check('Clipboard denial offers a focused selected URL',await page.locator('.share-url').evaluate(e=>!e.hidden&&document.activeElement===e&&e.value===location.href&&e.selectionEnd===e.value.length));
  await page.locator('.next-project a').click();await page.getByRole('heading',{name:'Pediatric Clinical Pearls',exact:true}).waitFor();
  check('Next-project link opens the next case study',await page.locator('#case-heading').innerText()==='Pediatric Clinical Pearls');
  await page.goBack();await page.getByRole('heading',{name:'Pediascape',exact:true}).waitFor();
  await page.getByRole('link',{name:'All selected work',exact:true}).click();
  await page.locator('#work').waitFor();
  check('Case study returns to collection',!page.url().includes('/project/'));
  await page.goBack();await page.getByRole('heading',{name:'Pediascape',exact:true}).waitFor();
  check('Browser back restores case study',await page.locator('#case-heading').innerText()==='Pediascape');
  await page.goto(base+'#/project/does-not-exist',{waitUntil:'networkidle'});
  check('Unknown project has helpful fallback',await page.getByRole('heading',{name:'That project isn’t here.'}).isVisible());
  await page.goto(base,{waitUntil:'networkidle'});
  await page.keyboard.press('Tab');
  check('Skip link is first keyboard focus',await page.getByRole('link',{name:'Skip to content'}).evaluate(e=>document.activeElement===e));
  await page.keyboard.press('Enter');
  check('Skip link reaches main',await page.locator('#main').evaluate(e=>document.activeElement===e));
  check('Reduced motion disables smooth scroll',await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto');
  const html = await readFile('dist/index.html','utf8');
  check('SEO metadata and favicon present',html.includes('og:image') && html.includes('name="description"') && html.includes('favicon.svg'));
  check('Initial HTML contains real portfolio content and structured data',html.includes('Canal Pediatric Conference') && html.includes('application/ld+json') && html.includes('Ideas made'));
  const coldContext = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const cold = await coldContext.newPage();
  const cdp = await coldContext.newCDPSession(cold);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cold.addInitScript(()=>{
    window.__qaCLS=0;window.__qaLCP=0;
    new PerformanceObserver(list=>{for(const entry of list.getEntries()){if(!entry.hadRecentInput)window.__qaCLS+=entry.value;}}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list=>{for(const entry of list.getEntries())window.__qaLCP=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  });
  await cold.goto(base,{waitUntil:'networkidle'});
  await cold.evaluate(()=>Promise.all([...document.images].filter(i=>i.loading==='eager').map(i=>i.decode())));
  await cold.waitForFunction(()=>window.__qaLCP>0);
  report.performance=await cold.evaluate(()=>({environment:'Local Brave/Chromium, unthrottled desktop, cache disabled',navigation:performance.getEntriesByType('navigation').map(e=>({durationMs:e.duration,transferBytes:e.transferSize})),initialTransferBytes:performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0),lcpMs:window.__qaLCP,cls:window.__qaCLS,resources:performance.getEntriesByType('resource').map(e=>({name:e.name.replace(location.origin,''),bytes:e.transferSize}))}));
  check('No initial layout shift in local desktop measurement',report.performance.cls<0.01);
  await coldContext.close();
  check('No runtime console errors',report.errors.length===0);
  check('No failed local requests',report.failedRequests.length===0);
  check('No automated WCAG A/AA violations in tested views',report.accessibility.every(a=>a.violations.length===0));
  console.log(`PASS: ${report.checks.length} checks; ${report.projects.length} case studies; ${galleryTotal} original artworks; ${report.viewports.length} viewport sizes.`);
} catch(error) {
  report.failure=error.stack;
  console.error(error);
  await page.screenshot({path:'qa/screenshots/failure.png',fullPage:true}).catch(()=>{});
  process.exitCode=1;
} finally {
  await writeFile('qa/report.json',JSON.stringify(report,null,2));
  await browser.close();
}
