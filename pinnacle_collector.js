var teamClass = '.ellipsis.event-row-participant.style_participant__32s23'
var oddClass = '.style_price__3LrWW'
var oddMoneylineClass = '.style_buttons__16HgT.style_moneyline__3_A20'
var matchClass = '.style_row__21s9o.style_row__21_Wa'

function convertToEnglish(text) {
  const accentedCharsMap = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ñ': 'n',
    'ã': 'a',
    'õ': 'o',
    'â': 'a',
    'ê': 'e',
    'î': 'i',
    'ô': 'o',
    'û': 'u',
    'ç': 'c'
  };

  return text
    .split('')
    .map(char => accentedCharsMap[char] || char)
    .join('');
}

function replaceCommonWords(str){
  if (str.includes(" acad")) {
    return str.replace(" acad", " academy");
  }
  return str;
}


function getOdd(oddElement){
  return parseFloat(oddElement.innerHTML)
}

function getName(nameElement){
  let regex = /^(.*)(?= \()/
  let name = nameElement.innerHTML //should add a function to check for match, outside of this one
  return name.includes('Match') ? replaceCommonWords(convertToEnglish(name.match(regex)[0].toLowerCase())) : 
  ''
}

function getMatches(){
 return document.querySelectorAll(matchClass);
}

// Get all app-match elements
const matches = getMatches();
let teams =  {}
// Iterate over each app-match element

matches.forEach(match => {
  // Get the team names and odds within each app-match element
  let key, value
  let teamNames = match.querySelectorAll(teamClass);
  let moneylineOdss = match.querySelectorAll(oddMoneylineClass);
  if (moneylineOdss.length != 1){
    throw Error('Couldn\'t parse moneyline odds')
  } else {
    odds = moneylineOdss[0].querySelectorAll(oddClass)
  }
  if (teamNames.length ==2 && odds.length ==2){
    teamNames = Array.from(teamNames).map(getName)
    odds = Array.from(odds).map(getOdd)
    lowIndex = !(odds[0] < odds[1]) + 0
    key = teamNames[lowIndex] + ':' + teamNames[!lowIndex + 0]
    value = [odds[lowIndex], odds[!lowIndex + 0]]
    if (teamNames[0] != '')  
      teams[key] = value
  } else {
    throw Error('Bad teams or odds length')
  }
}  
);
teams
