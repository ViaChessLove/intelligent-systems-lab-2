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
const formattedContentToLowerCase = fileTexts.map(({title, content}) => ({
  title,
  content: content.toLowerCase(),
}));

const filteredText = formattedContentToLowerCase.map(({title, content}) => ({
  title,
  content: content
  .split('')
  .filter((character) => filterBySymbolAndNumber(symbols, character, numberPattern))
  .join(''),
}));

const tokenizedText = filteredText.map(({title, content}) => ({
  title,
  content: content
  .split('\r\n')
  .join(' ')
  .split(' ')
  .filter((character) => character === '' ? false : true),
}));

const tokenizedTextWithoutStopWords = tokenizedText.map(({title, content}) => ({
  title,
  content: content.filter((character) => filterByStopWords(character, stopWords)),
}));

console.log(tokenizedTextWithoutStopWords);
