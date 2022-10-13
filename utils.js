const { countBy } = require('lodash');
const { stemmer } = require('porter-stemmer');
const {
  SYMBOLS,
  NUMBER_PATTERN,
} = require('./constants');


const countCharactersInString = (str, ch) => countBy(str)[ch] || 0;

const readFile = (fileName) => {
  const fileStream = require('fs');
  const path = process.cwd();
  return fileStream
  .readFileSync(path + fileName)
  .toString();
};

const fillTextWithContentFromData = (fileTexts, title) => {
  const fileName = `${title}.txt`;
  const textPath = `/data/${fileName}`;
  const fileContent = readFile(textPath);
  const fileInfo = {
    title: fileName,
    content: fileContent
  };
  fileTexts.push(fileInfo);
};

const filterBySymbol = (SYMBOLS, character) => {
  let filterFlag = true;
  SYMBOLS.forEach((symbol) => {
    if (symbol === character) {
      filterFlag = false;
    }
  });
  return filterFlag;
};

const filterByPattern = (character, pattern) => {
  return !character
  .match(pattern)
  ? true
  : false;
}

const filterBySymbolAndNumber = (SYMBOLS, character, NUMBER_PATTERN) => {
  let filterFlag = filterBySymbol(SYMBOLS, character);

  return filterFlag ? filterByPattern(character, NUMBER_PATTERN) : filterFlag;
};

const filterByStopWords = (character, stopWords) => {
  let filterFlag = true;
  stopWords.forEach((word) => {
    if (character === word) {
      filterFlag = false;
    }
  });
  return filterFlag;
};

const tokenizeText = (text) => (
  text
  .toLowerCase()
  .split('')
  .filter((character) => filterBySymbolAndNumber(SYMBOLS, character, NUMBER_PATTERN))
  .join('')
  .split('\r\n')
  .join(' ')
  .split(' ')
  .filter((character) => character === '' ? false : true
));

const stemText = (text) => text
  .map((word) => (
    word
    .split('-')
    .map((word) => stemmer(word))
    .join('-')
));

module.exports = {
  readFile,
  fillTextWithContentFromData,
  filterBySymbolAndNumber,
  filterByStopWords,
  countCharactersInString,
  tokenizeText,
  stemText,
};
