const puppeteer = require('puppeteer');
const Match = require('../classes/Match')


const URL ='https://www.pinnacle.com/en/esports/games/league-of-legends/matchups'
const matchesContainerSelector = '#events-chunkmode > div'; 
const matchSelector = '.scrollbar-item';
const teamSelector =  '.event-row-participant';
const GAME = 'LOL'

function containsMatch(matchesArray, currentMatch){
  for ( const match of matchesArray){
    if (match.id === currentMatch.id)
      return true
  }
  return false;

}

async function getElementText(element){
  return await element.evaluate(node => node.innerText)
}


async function scrollElement(page, selector){
  await page.evaluate((selector) => {
    let scrollable = document.querySelector(selector)
    scrollable.scrollBy(0, scrollable.clientHeight)  
  }, selector)
  await new Promise(r => setTimeout(r, 1000));
  console.log("scrolled------------------")
} 

async function getMatches(page, matchesArray){
  await page.waitForSelector(matchSelector);
  console.log("Matches present in page") 
  let matchesContainer = await page.$(matchesContainerSelector); 
  let matches = await matchesContainer.$$(matchSelector);
  for (const match of matches) {
    const teamElements = await match.$$(teamSelector)
    const teamsArray = await Promise.all(teamElements.map(getElementText))
    const currentMatch = new Match(GAME, teamsArray, [] )
    if (!containsMatch(matchesArray, currentMatch))
      matchesArray.push(currentMatch)
    
  }
}


async function runBot() {
  let browser;
  try{
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    const matchesArray = []
    let prevSize = -1
    while (prevSize !== matchesArray.length){
      prevSize = matchesArray.length
      await getMatches(page, matchesArray);
      await scrollElement(page, matchesContainerSelector)
      console.log("arr size: " + matchesArray.length)
    }

    console.log(matchesArray)    
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

runBot()
