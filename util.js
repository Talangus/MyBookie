const fs = require('fs');

function convertToEnglish(text) {
    const accentedCharsMap = {
      'á': 'a',
      'é': 'e',
      'í': 'i',
      'ó': 'o',
      'ú': 'u',
      'ñ': 'n',
      'ã': 'a',
      'õ': 'o',
      'â': 'a',
      'ê': 'e',
      'î': 'i',
      'ô': 'o',
      'û': 'u',
      'ç': 'c'
    };
  
    return text
      .split('')
      .map(char => accentedCharsMap[char] || char)
      .join('');
}

async function getElementText(element){
    return await element.evaluate(node => node.innerText)
}  
  
async function scrollElement(page, selector){
    await page.evaluate((selector) => {
      let scrollable = document.querySelector(selector)
      scrollable.scrollBy(0, scrollable.clientHeight)  
    }, selector)
    await new Promise(r => setTimeout(r, 1000));
    console.log("scrolled------------------")
} 

function safeWrite(filePath, content){
    fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log(`Written to ${filePath} successfully.`);
        }
      });
}

module.exports = {
  convertToEnglish,
  getElementText,
  scrollElement,
  safeWrite
}