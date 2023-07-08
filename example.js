const puppeteer = require('puppeteer');

async function runBot() {
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto(
    'https://www.scrapethissite.com/pages/frames/'
  );
  
  const elem = await page.$('#iframe');
  const boundingBox = await elem.boundingBox();
  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2,
    boundingBox.y + boundingBox.height / 2
  );
  
  await page.mouse.wheel({deltaY: -100});


}

runBot()