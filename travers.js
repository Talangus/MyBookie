function findNodesWithRegex(rootNode, teamRegex, oddRegex) {
  
  function mergeResult(nodeResult, childResult){
    const unifiedTeamsSet = new Set([...nodeResult.teams, ...childResult.teams]);
    const unifiedOddsSet = new Set([...nodeResult.odds, ...childResult.odds]);
  
    const unifiedObject = {
      teams: unifiedTeamsSet,
      odds: unifiedOddsSet,
    };
  
    return unifiedObject;
  }

  function traverse(node) {
    if (!node) return;
    let nodeResult = {teams: new Set(), odds: new Set()}
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (teamRegex.test(node.innerText)) {
        nodeResult.teams.add(node.innerText);
        return nodeResult;
      }
      if (oddRegex.test(node.innerText)) {
        nodeResult.odds.add(node.innerText);
        return nodeResult;
      }
    }

    for (const childNode of node.childNodes) {
      let childResult = traverse(childNode);
      nodeResult = mergeResult(nodeResult, childResult);
      if (nodeResult.teams.size == 2 && nodeResult.odds.size == 2){
        allResults.push(nodeResult)
        return {teams: new Set(), odds: new Set()}
      }

    }
    return nodeResult;

  }
  traverse(rootNode);
  
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