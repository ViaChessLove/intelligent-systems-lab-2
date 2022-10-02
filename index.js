"use strict";

const readLine = require('readline-sync');
const constants = require('./constants');
const utils = require('./utils');

const {
  question,
} = readLine;

const {
  stopWords,
  symbols,
  numberPattern,
  fileTitles
} = constants;

const {
  fillTextWithContentFromData,
  filterBySymbolAndNumber,
  filterByStopWords,
} = utils;



//const fileText = question('Input the file title: ');
const fileTexts = [];
fileTitles.forEach((title) => fillTextWithContentFromData(fileTexts, title));

const formattedContentToLowerCase = fileTexts.join('').toLowerCase();
const filteredText = formattedContentToLowerCase.split('')
  .filter((character) => filterBySymbolAndNumber(symbols, character, numberPattern)).join('');

const words = filteredText.split('\r\n').join(' ').split(' ').filter((character) => character === '' ? false : true);

const wordsWithoutStopWords = words.filter((character) => filterByStopWords(character, stopWords));
console.log(wordsWithoutStopWords);