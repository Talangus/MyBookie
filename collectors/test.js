const puppeteer = require('puppeteer');

async function scrollElement(){
  page.evaluate(() => {
    document.querySelector(parentElementClassId).scrollBy(0, 200)})
} 



async function runBot() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const elements = []
  try {
    await page.goto('https://www.pinnacle.com/en/esports/games/league-of-legends/matchups'); 

    const parentElementClassId = '#events-chunkmode > div'; // Replace with the parent element's class ID
    const childElementClassId = '.scrollbar-item'; // Replace with the sub-element's class ID

    await page.waitForSelector(parentElementClassId); // Wait for the parent element to appear
    await page.waitForSelector(childElementClassId);
    let parentElement = await page.$(parentElementClassId); // Find the parent element

    let subElements = await parentElement.$$(childElementClassId); // Find all sub-elements within the parent element

    
    for (const element of subElements) {
      const participants = await element.$$('.event-row-participant')
      for (const participant of participants){
        const text = await participant.evaluate(node => node.innerText); // Get the text content of each sub-element
        console.log(text);
      }
    }
    await page.evaluate(() => {
      document.querySelector('#events-chunkmode > div').scrollBy(0, 5000)})
    console.log("scrolled------------------")
    await new Promise(r => setTimeout(r, 5000));
    parentElement = await page.$(parentElementClassId); // Find the parent element

    subElements = await parentElement.$$(childElementClassId); // Find all sub-elements within the parent element  
    
    console.log("new run------------------")
    
    for (const element of subElements) {
      const participants = await element.$$('.event-row-participant')
      for (const participant of participants){
        const text = await participant.evaluate(node => node.innerText); // Get the text content of each sub-element
        console.log(text);
      }
    }


    
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

runBot().then(res => {console.log(res)})
