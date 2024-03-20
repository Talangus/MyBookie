const Match = require('../classes/Match')
const util = require('../util');


const matchSelector = ''
const teamSelector = ''
const typeSekector = ''
const GAME = ''


function getMatchElements(){
    return document.getElementsByClassName('__app-SmartLink-link __app-OverviewRow-container overviewRow__container___2uPYc')
}

function getTeamElements(match){
    return match.getElementsByClassName('__app-LogoTitle-name logoTitle__name___3_ywM')
}
  
function getOddElements(match){
    let mainOdd = match.getElementsByClassName('market__container___3VAIG')[0]
    return mainOdd.getElementsByClassName('__app-OddButton-coef oddButton__coef___2tokv')
}
  
function getTypeElement(match){
    let mainOdd = match.getElementsByClassName('market__container___3VAIG')[0]
    return mainOdd.getElementsByClassName('__app-Market-name market__name___2HszL')[0]
}
  

function parseTeamElements(){

}

function parseOddsElements(){
    
}

function parseTypeElements(){
    
}

function parsePage(){
    let allMatches = []
    let matchElements = getMatchElements()
    matchElements.forEach(matchElement => {
        let teamElements = getTeamElements(matchElement)
        let oddElements = getOddElements(matchElement)
        let typeElement = getTypeElement(matchElement)
        let teams = parseTeamElements(teamElements)
        let odds = parseOddsElements(oddElements)
        let type = parseTypeElements(typeElement)
        let match = new Match(GAME, teams, odds, type)
        if (match)
            allMatches.push(match)
    });
}

