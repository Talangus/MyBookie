
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


function getOdd(oddElement){
  return parseFloat(oddElement.innerHTML.trim().substr(0,4))
}

function getName(nameElement){
  return convertToEnglish(nameElement.innerHTML.trim().toLowerCase())
}

function getMatches(){
 return document.querySelectorAll('app-match');
}

// Get all app-match elements
const appMatches = getMatches();
let teams =  {}
// Iterate over each app-match element

appMatches.forEach(appMatch => {
  // Get the team names and odds within each app-match element
  let key, value
  let teamNames = appMatch.querySelectorAll('.name.text-clip');
  let odds = appMatch.querySelectorAll('.cof');
  if (teamNames.length ==2 && odds.length ==2){
    teamNames = Array.from(teamNames).map(getName)
    odds = Array.from(odds).map(getOdd)
    lowIndex = !(odds[0] < odds[1]) + 0
    key = teamNames[lowIndex] + ':' + teamNames[!lowIndex + 0]
    value = [odds[lowIndex], odds[!lowIndex + 0]]
    teams[key] = value
  }
}  
);
teams
