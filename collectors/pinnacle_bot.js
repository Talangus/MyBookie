const puppeteer = require('puppeteer');
const Match = require('../classes/Match')
const util = require('../util')


const matchesContainerSelector = '#events-chunkmode > div'; 
const matchSelector = '.scrollbar-item';
const teamSelector =  '.event-row-participant';

function containsMatch(matchesArray, currentMatch){
  for ( const match of matchesArray){
    if (match.id === currentMatch.id)
      return true
  }
  return false;
}

async function getMatches(page, matchesArray, game){
  await page.waitForSelector(matchSelector);
  let matchesContainer = await page.$(matchesContainerSelector); 
  let matches = await matchesContainer.$$(matchSelector);
  for (const match of matches) {
    const teamElements = await match.$$(teamSelector)
    const teamsArray = await Promise.all(teamElements.map(util.getElementText))
    const currentMatch = new Match(game, teamsArray, [] )
    if (!containsMatch(matchesArray, currentMatch))
      matchesArray.push(currentMatch)
  }
}


async function runBot(url, game) {
  let browser, matchesArray;
  try{
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    matchesArray = []
    let prevSize = -1
    while (prevSize !== matchesArray.length){
      prevSize = matchesArray.length
      await getMatches(page, matchesArray, game);
      await util.scrollElement(page, matchesContainerSelector)
      console.log("arr size: " + matchesArray.length)
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
    return matchesArray; 
  }
}

module.exports = runBot
