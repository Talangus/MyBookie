const Match = require('./classes/Match')
const runBot = require('./collectors/pinnacle_bot')
const util = require ('./util')

runBot('https://www.pinnacle.com/en/esports/games/league-of-legends/matchups', 'LOL')
.then(res => util.safeWrite('./outputs/pinnacle/LOL.json', JSON.stringify(res)))

runBot('https://www.pinnacle.com/en/esports/games/csgo/matchups', 'CSGO')
.then(res => util.safeWrite('./outputs/pinnacle/CSGO.json', JSON.stringify(res)))