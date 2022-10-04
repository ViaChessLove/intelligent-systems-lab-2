"use strict";

//TODO: добавить весовые коэффициенты для термов (то что отстемлено)
//TODO: посчитать релевантность 
//TODO: реализовать одну из моделей поиска
//TODO: выдача при поиске должна выдавать название файла, сходные термы, 
const stemmer = require('porter-stemmer').stemmer;
const readLine = require('readline-sync');
const lodash = require('lodash');

const constants = require('./constants');
const utils = require('./utils');


const {
  countBy
} = lodash;

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
  countCharacterInString
} = utils;

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

const stemmed = stemmer('Smurfastic');
console.log(stemmed);

