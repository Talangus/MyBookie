const crypto = require('crypto');

function generateMD5Hash(input) {
    const md5Hash = crypto.createHash('md5').update(input).digest('hex');
    return md5Hash.substring(0, 10);
}

class Match {
    constructor(game, teams) {
        //if validInput(game, teams) continue else null
        //renameForConvention()
        this.game = game;
        this.teams = teams;        
        this.id = generateMD5Hash(game + teams.toString())
    } 
}

module.exports = Match;