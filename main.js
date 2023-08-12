const Match = require('./classes/Match')
//const runBot = require('./collectors/pinnacle_bot2')
const runBot = require('./collectors/loot.bet_bot.js')
const util = require ('./util')

// runBot('https://www.pinnacle.com/en/esports/games/league-of-legends/matchups', 'LOL')
// .then(res => util.safeWrite('./outputs/pinnacle/LOL.json', JSON.stringify(res)))

// runBot('https://www.pinnacle.com/en/esports/games/csgo/matchups', 'CSGO')
// .then(res => util.safeWrite('./outputs/pinnacle/CSGO.json', JSON.stringify(res)))

// runBot('https://www.pinnacle.com/en/esports/games/dota-2/matchups/', 'DOTA')
// .then(res => util.safeWrite('./outputs/pinnacle/DOTA.json', JSON.stringify(res)))

// runBot('https://www.pinnacle.com/en/esports/games/crossfire/matchups/', 'CROSSFIRE')
// .then(res => util.safeWrite('./outputs/pinnacle/CROSSFIRE.json', JSON.stringify(res)))

// runBot('https://www.pinnacle.com/en/esports/games/honor-of-kings/matchups/', 'HONOROFKINGS')
// .then(res => util.safeWrite('./outputs/pinnacle/HONOROFKINGS.json', JSON.stringify(res)))


runBot('https://loot.bet/counter-strike', 'CSGO')
.then(res => util.safeWrite('./outputs/pinnacle/CSGO.json', JSON.stringify(res)))