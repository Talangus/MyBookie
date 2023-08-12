const Match = require('./classes/Match')
const lootBet_bot = require('./collectors/loot.bet_bot.js')
const util = require ('./util')
const pinnacle_bot = require('./collectors/pinnacle_bot2')


// pinnacle_bot.runBot('https://www.pinnacle.com/en/esports/games/league-of-legends/matchups', 'LOL')
// .then(res => util.safeWrite('./outputs/pinnacle/LOL.json', JSON.stringify(res)))

// pinnacle_bot.runBot('https://www.pinnacle.com/en/esports/games/csgo/matchups', 'CSGO')
// .then(res => util.safeWrite('./outputs/pinnacle/CSGO.json', JSON.stringify(res)))

// pinnacle_bot.runBot('https://www.pinnacle.com/en/esports/games/dota-2/matchups/', 'DOTA')
// .then(res => util.safeWrite('./outputs/pinnacle/DOTA.json', JSON.stringify(res)))


// pinnacle_bot.runBot('https://www.pinnacle.com/en/esports/games/starcraft-brood-war/matchups', 'STAR')
// .then(res => util.safeWrite('./outputs/pinnacle/STAR.json', JSON.stringify(res)))

// pinnacle_bot.runBot('https://www.pinnacle.com/en/esports/games/overwatch/matchups', 'OVER')
// .then(res => util.safeWrite('./outputs/pinnacle/OVER.json', JSON.stringify(res)))



lootBet_bot.runBot('https://loot.bet/counter-strike', 'CSGO')
.then(res => util.safeWrite('./outputs/loot.bet/CSGO.json', JSON.stringify(res)))

lootBet_bot.runBot('https://loot.bet/dota-2', 'DOTA')
.then(res => util.safeWrite('./outputs/loot.bet/DOTA.json', JSON.stringify(res)))

lootBet_bot.runBot('https://loot.bet/lol', 'LOL')
.then(res => util.safeWrite('./outputs/loot.bet/LOL.json', JSON.stringify(res)))

lootBet_bot.runBot('https://loot.bet/starcraft', 'STAR')
.then(res => util.safeWrite('./outputs/loot.bet/STAR.json', JSON.stringify(res)))

lootBet_bot.runBot('https://loot.bet/overwatch', 'OVER')
.then(res => util.safeWrite('./outputs/loot.bet/OVER.json', JSON.stringify(res)))