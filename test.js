const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Navigating to google.com ...');
  await page.goto('https://www.google.com');

  console.log('\t... searching for "puppies" ...');
  await page.click('#searchform input[name=q]');
  const { keyboard } = page;
  await keyboard.type('puppies');
  await keyboard.press('Enter');

  await page.waitForNavigation();
  console.log('\t... search complete ...');

  const title = await page.title();
  console.log(`\t... saving screenshot of page "${title}"`);

  await page.screenshot({ path: 'puppy-search.png' });

  console.log('\t... DONE');
  await browser.close();
})();
