const Node = require('puppeteer').Node;

function findNodesWithRegex(teamRegexString, oddRegexString) {
  
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
    if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {     
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
  const rootNode = document.body
  const allResults = []
  const teamRegex = new RegExp(teamRegexString, 'i')
  const oddRegex = new RegExp(oddRegexString, 'i')
  traverse(rootNode);
  return JSON.stringify(allResults.map(obj => ({
    teams: Array.from(obj.teams),
    odds: Array.from(obj.odds)
  })))
  
}




module.exports = {findNodesWithRegex}