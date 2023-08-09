function findNodesWithRegex(rootNode, teamRegex, oddRegex) {
    
  function traverse(node, result) {
    if (!node) return;
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (result.teams.length < 2 && teamRegex.test(node.innerText)) {
        result.teams.push(node.innerText);
        return result;
      }
      if (result.odds.length < 2 && oddRegex.test(node.innerText)) {
        result.odds.push(node.innerText);
        return result;
      }
    }

    for (const childNode of node.childNodes) {
      result = traverse(childNode, result);
      if (result.teams.length == 2 && result.odds.length == 2){
        allResults.push(result)
        return {teams: [], odds: []}
      }

    }
    return result;

  }
  let result = {teams: [], odds: []};
  traverse(rootNode, result);
  
}

const rootNode = document.body; 
const teamRegex = /[a-zA-Z0-9!@#$%^&*()_]+ \((?:map \d|match)\)$/i;
const oddRegex = /^\d\.\d{3}$/;

const allResults = []
findNodesWithRegex(rootNode, teamRegex, oddRegex);
console.log(allResults);



// Close but not ready.
// Results are cleared, and the next odds node is scanned and the order is messed up.
//Need to go back up to common ancestor, than clean and move to brother.