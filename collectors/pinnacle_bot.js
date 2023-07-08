const puppeteer = require('puppeteer');

const URL ='https://www.pinnacle.com/en/esports/games/league-of-legends/matchups'
const matchesContainerClass = '#events-chunkmode > div'; 
const matchClass = '.scrollbar-item';
const teamClass =  '.event-row-participant';

async function scrollElement(page){
  await page.evaluate((elementClass) => {
    document.querySelector(elementClass).scrollBy(0, 200)}, matchesContainerClass)
  await new Promise(r => setTimeout(r, 5000));
  console.log("scrolled------------------")
} 

async function getCurrentElements(page){
  await page.waitForSelector(matchesContainerClass);
  console.log("done wait parent------------------") 
  await page.waitForSelector(matchClass);
  console.log("done wait childern------------------") 
  let parentElement = await page.$(matchesContainerClass); 
  let subElements = await parentElement.$$(matchClass);
  for (const element of subElements) {
    const participants = await element.$$(teamClass)
    for (const participant of participants){
      const text = await participant.evaluate(node => node.innerText); // Get the text content of each sub-element
      console.log(text);
    }
  }
}


async function runBot() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({
    width: 580,
    height: 929,
  })
  try {
    await page.goto(URL);
    await getCurrentElements(page) 
    await scrollElement(page)
    await getCurrentElements(page)
    await scrollElement(page)
    await getCurrentElements(page)
    
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

runBot().then(res => {console.log(res)})
