const fs = require('fs');
const path = require('path');



function possible(odds_1, odds_2) {
  // Calculate the inverse of the decimal odds
  const inverse_odds_1 = 1 / odds_1[0];
  const inverse_odds_2 = 1 / odds_2[1];

  // Calculate the sum of inverse odds
  const total_inverse_odds = inverse_odds_1 + inverse_odds_2;

  return total_inverse_odds < 1;
}

function profit(odds_1, odds_2, stake1) {
  const range = [(stake1 / (odds_2[1] - 1)), stake1 * (odds_1[0] - 1)];
  const avg = (range[0] + range[1]) / 2;
  const invest = stake1 + avg;
  const profit1 = (stake1 * odds_1[0]) - invest;
  const profit2 = (avg * odds_2[1]) - invest;
  console.log(`With ${stake1.toFixed(2)} on odd1 and ${avg.toFixed(2)} on odd2, you can profit ${profit1.toFixed(2)} or ${profit2.toFixed(2)} ~ ${((profit1 / invest) * 100).toFixed(2)}% or ${((profit2 / invest) * 100).toFixed(2)}%`);
}

function profit2(odds_1, odds_2, stake1) {
  const range = [(stake1 / (odds_2[1] - 1)), stake1 * (odds_1[0] - 1)];
  const avg = range[0] + 0.1;
  const invest = stake1 + avg;
  const profit1 = (stake1 * odds_1[0]) - invest;
  const profit2 = (avg * odds_2[1]) - invest;
  console.log(`With ${stake1.toFixed(2)} on odd1 and ${avg.toFixed(2)} on odd2, you can profit ${profit1.toFixed(2)} or ${profit2.toFixed(2)} ~ ${((profit1 / invest) * 100).toFixed(2)}% or ${((profit2 / invest) * 100).toFixed(2)}%`);
}

function check(odds_1, odds_2, stake1) {
  if (possible(odds_1, odds_2)) {
    profit(odds_1, odds_2, stake1);
    profit2(odds_1, odds_2, stake1);
  }
  if (possible(odds_2, odds_1)) {
    profit(odds_2, odds_1, stake1);
    profit2(odds_2, odds_1, stake1);
  }
}


function confirmKeys(obj2, key1) {
    for (const key2 of Object.keys(obj2)) {
      if (key1 == key2 || key1.includes(key2) || key2.includes(key1)) {
        return key2;
      }
    }
    return undefined;
  }

function processFolders(folder1, folder2) {
  let count = 0;  
  fs.readdirSync(folder1).forEach(filename => {
        if (filename.endsWith(".json")) {
            const file1Path = path.join(folder1, filename);
            const file2Path = path.join(folder2, filename);

            const data1 = JSON.parse(fs.readFileSync(file1Path, 'utf8'));
            const data2 = JSON.parse(fs.readFileSync(file2Path, 'utf8'));

            data1.forEach(obj1 => {
                data2.forEach(obj2 => {
                    if (obj1.id === obj2.id) {
                      count++
                      console.log("checking " + obj1.id)
                      check(obj1.odds, obj2.odds, 100)
                    }
                });
            });
        }
    });
console.log(`compared ${count} matches odd `)
}

processFolders('./outputs/loot.bet', './outputs/pinnacle')



  