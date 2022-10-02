const readFile = (fileName) => {
  const fileStream = require('fs');
  const path = process.cwd();
  return fileStream.readFileSync(path + fileName).toString();
};

const fillTextWithContentFromData = (fileTexts, title) => {
  const textPath = `/data/${title}.txt`;
  const fileContent = readFile(textPath);
  fileTexts.push(fileContent)
};

const filterBySymbol = (symbols, character) => {
  let filterFlag = true;
  symbols.forEach((symbol) => {
    if (symbol === character) {
      filterFlag = false;
    }
  });
  return filterFlag;
};

const filterByPattern = (character, pattern) => {
  return !character.match(pattern) ? true : false;
}

const filterBySymbolAndNumber = (symbols, character, numberPattern) => {
  let filterFlag = filterBySymbol(symbols, character);

  return filterFlag ? filterByPattern(character, numberPattern) : filterFlag;
};

const filterByStopWords = (character, stopWords) => {
  let filterFlag = true;
  stopWords.forEach((word) => {
    if (character === word) {
      filterFlag = false;
    }
  });
  return filterFlag;
}

module.exports = {
  readFile,
  fillTextWithContentFromData,
  filterBySymbolAndNumber,
  filterByStopWords,
};
