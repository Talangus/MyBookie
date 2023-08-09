const puppeteer = require('puppeteer');
const Match = require('../classes/Match')
const util = require('../util')


const matchesContainerSelector = '#events-chunkmode > div'; 
const matchSelector = '.scrollbar-item';
const teamSelector =  '.event-row-participant';
const moneylineOddsContainerSelector = 'div > div.style_moneyline__2CCDG'
const oddSelector = 'button > span'

function parseName(str){
  const regexPattern = /(.+)\s+\([^)]+\)/;
  const regexMatch = str.match(regexPattern);
  if (regexMatch && regexMatch[1]) {
    return regexMatch[1].toLowerCase();
  } else {
    return ''
  } 
}

function parseType(str){
  if (str){
    const regexPattern = /\(([^)]+)\)/;
    const regexMatch = str.match(regexPattern);
    if (regexMatch && regexMatch[1]) 
      return regexMatch[1].toLowerCase().replace(' ','');
  }
  return ''
   
  
}

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
    try {
      const teamElements = await match.$$(teamSelector)
      const teamsArray = await Promise.all(teamElements.map(util.getElementText))
      const parsedTeams = teamsArray.map(parseName)
      const parsedType =  parseType(teamsArray[0])

      const oddsContainer = await match.$(moneylineOddsContainerSelector)
      const oddsElements = await oddsContainer.$$(oddSelector)
      const oddsArray = await Promise.all(oddsElements.map(util.getElementText))
      const parsedOdds = oddsArray.map((odd) => parseFloat(odd))

      const currentMatch = new Match(game, parsedTeams, parsedOdds, parsedType)
      if (util.validMatch(currentMatch) && !containsMatch(matchesArray, currentMatch))
        matchesArray.push(currentMatch)
    } catch (err) {
      console.log("Can't parse match: skipping")
    }
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
      console.log( game + " matches parsed: " + matchesArray.length)
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
    return matchesArray; 
  }
}

module.exports = runBot
