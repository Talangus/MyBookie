let config = {
  getOdd: function(oddElement){return parseFloat(oddElement.innerHTML.trim().substr(0,4))},
  getName: function(nameElement){return convertToEnglish(nameElement.innerHTML.trim().toLowerCase())},
  getGame: function(gameElement){return gameElement['alt'].match(/\[(.*?)\]/)[1].toLowerCase()},
  getGameElem: function(matcElement){return matcElement.querySelector('picture') && matcElement.querySelector('picture').querySelector('img')},
  teamClass: '.name.text-clip',
  oddClass: '.cof',
  matchClass: 'app-match'
  


}



function getMatches(){
 return document.querySelectorAll(config.matchClass);
}


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

const matches = getMatches();
let games =  {}
let badMatches = []

matches.forEach(match => {
  let key, value
  let teamNames = match.querySelectorAll(config.teamClass);
  let odds = match.querySelectorAll(config.oddClass);
  let game = config.getGameElem(match)
  if (teamNames.length ==2 && odds.length ==2 && game){
    teamNames = Array.from(teamNames).map(config.getName)
    odds = Array.from(odds).map(config.getOdd)
    game = config.getGame(game)
    lowIndex = !(odds[0] < odds[1]) + 0
    key = teamNames[lowIndex] + ':' + teamNames[!lowIndex + 0]
    value = [odds[lowIndex], odds[!lowIndex + 0]]
    games[game] = games[game] || {}
    games[game][key] = [value]
  } else {console.log("Bad match"); badMatches.push(match)}
  
}  
);
[games, badMatches]
