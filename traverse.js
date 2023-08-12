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


//modification to traversal
// return results upwards only if found the string, odd and team matches came together, or you got 2 odds and 2 teams.

function findNodesWithRegex2(teamRegexString, oddRegexString, typeRegexString) {
  
  function mergeResult(nodeResult, childResult){
    let {team: currentTeam, odd: currentOdd} = nodeResult;
    let {team: newTeam, odd: newOdd} = childResult;

    emptyNodeResult = (!currentTeam && !currentOdd)
    missingTeam = (!currentTeam && currentOdd)
    missingOdd = (currentTeam && !currentOdd)
    fullNodeResult =  (currentTeam && currentOdd)
    emptyChildResult = (!newTeam && !newOdd)
    hasOdd = (!newTeam && newOdd)
    hasTeam = (newTeam && !newOdd)
    fullChildResult =  (newTeam && newOdd)



    if (fullNodeResult && fullChildResult){   //found 2 good nodes
      allResults.push({teams: new Set([currentTeam, newTeam]), odds: new Set([currentOdd, newOdd])})
      return {team: undefined, odd: undefined}
    }

    if (fullChildResult){                     //found 1 good node
      return childResult
    }
    
    if(missingTeam && hasTeam){
      return {team: newTeam, odd: currentOdd}
    }

    if(missingOdd && hasOdd){
      return {team: currentTeam, odd: newOdd}
    }

    if (emptyNodeResult){
      return childResult
    }

    return nodeResult;
    
    
  }

  function traverse(node) {
    if (!node) return;
    let nodeResult = {team: undefined, odd: undefined}
    if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
      if (typeRegex.test(node.innerText)) {
        allTypes.push(node.innerText)
        return nodeResult;
      }
      if (teamRegex.test(node.innerText)) {
        nodeResult.team = node.innerText;
        return nodeResult;
      }
      if (oddRegex.test(node.innerText)) {
        nodeResult.odd = node.innerText;
        return nodeResult;
      }
    }
    
    for (const childNode of node.childNodes) {
      let childResult = traverse(childNode);
      nodeResult = mergeResult(nodeResult, childResult);
    }
    
    return nodeResult;

  }
  const rootNode = document.body
  const allResults = []
  const allTypes = []
  const teamRegex = new RegExp(teamRegexString, 'i')
  const oddRegex = new RegExp(oddRegexString, 'i')
  const typeRegex = new RegExp(typeRegexString, 'i')
  traverse(rootNode);
  
  return JSON.stringify(allResults.map((obj, index) => {
   return {teams: Array.from(obj.teams),
          odds: Array.from(obj.odds),
          type: allTypes[index]}
  }))
  
}

module.exports = {findNodesWithRegex, findNodesWithRegex2}