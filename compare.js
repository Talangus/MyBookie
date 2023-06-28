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


const fs = require('fs');

// Load the first JSON file
const file1 = fs.readFileSync('./pinanacle_output.json', 'utf8');
const obj1 = JSON.parse(file1);

// Load the second JSON file
const file2 = fs.readFileSync('./loot_output.json', 'utf8');
const obj2 = JSON.parse(file2);

Object.keys(obj1).forEach(key1 => {
    let key2 = confirmKeys(obj2, key1)
    if (key2){
        console.log("Match is: " + key1)
        console.log(obj1[key1])
        console.log(obj2[key2])
        check(obj1[key1], obj2[key2], 100);
    }
})




 
  