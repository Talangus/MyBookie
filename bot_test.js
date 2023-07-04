const puppeteer = require('puppeteer');

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page in the browser
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://www.scrapethissite.com/pages/');

  // Wait for the required elements to be visible
  await page.waitForSelector('p.lead.session-desc');

  // Extract the text content of the elements
  const elements = await page.$$eval('p.lead.session-desc', (paragraphs) =>
    paragraphs.map((p) => p.textContent.trim())
  );

  // Print the collected text content
  console.log(elements);

  // Close the browser
  await browser.close();
})();