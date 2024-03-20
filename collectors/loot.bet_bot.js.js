const puppeteer = require('puppeteer');
const Match = require('../classes/Match')
const util = require('../util');
const { findNodesWithRegex2 } = require('../traverse');



const scrollableSelector = 'body'; 
const matchSelector = 'div > div';
const teamSelector =  '.event-row-participant';
const moneylineOddsContainerSelector = 'div > div.style_moneyline__2CCDG'
const oddSelector = 'button > span'

function parseName(str){
  return str.toLowerCase()
}

function parseType(str){
  if (str){
    const regexPattern = /(match|map \d)/i;
    const regexMatch = str.match(regexPattern);
    if (regexMatch && regexMatch[0]) 
      return regexMatch[0].toLowerCase().replace(' ','');
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
  
  
  const teamRegexString = "^[a-zA-Z0-9!@#$%^&*()_]+( [a-zA-Z0-9!@#$%^&*()_]+){0,2}$";
  const oddRegexString = "^\\d\\.\\d{2}$";
  const typeRegexString = '^(match|map \\d|winner| )+$'
  const matches =  JSON.parse(await page.evaluate(findNodesWithRegex2 ,teamRegexString, oddRegexString, typeRegexString)) 
 
  
  for (const match of matches) {
    try {
      const teamsArray = [...match.teams]
      const parsedTeams = teamsArray.map(parseName)
      const parsedType =  parseType(match.type)
      const oddsArray = [...match.odds]
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
    await page.setViewport({
      width: 1920,   
      height: 1920, 
    });
    await page.goto(url);
    matchesArray = []
    let prevSize = -1
    while (prevSize !== matchesArray.length){
      prevSize = matchesArray.length
      await getMatches(page, matchesArray, game);
      await util.scrollWindow(page)
      console.log( game + " matches parsed: " + matchesArray.length)
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
    return matchesArray; 
  }
}

module.exports = {runBot}
