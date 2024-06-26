const crypto = require('crypto');

function generateMD5Hash(input) {
    const md5Hash = crypto.createHash('md5').update(input).digest('hex');
    return md5Hash.substring(0, 10);
}

class Match {
    constructor(game, teams, odds, type) {
        let lowIndex = 0
        if (odds.length = 2)
            lowIndex = !(odds[0] < odds[1]) + 0
        this.game = game;
        this.teams = [teams[lowIndex], teams[!lowIndex + 0]];        
        this.odds = [odds[lowIndex], odds[!lowIndex + 0]];
        this.type = type
        this.id = generateMD5Hash(game + teams.toString() + type.toString())
    } //if you change here, change match validator
}

module.exports = Match;
