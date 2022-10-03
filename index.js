"use strict";


//TODO: сделать стемминг Портера
//TODO: добавить весовые коэффициенты для термов (то что отстемлено)
//TODO: посчитать релевантность 
//TODO: реализовать одну из моделей поиска
//TODO: выдача при поиске должна выдавать название файла, сходные термы, 

const readLine = require('readline-sync');
const constants = require('./constants');
const utils = require('./utils');
const porterStemmer = require('./porterStemmer');
const lodash = require('lodash');

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

const {
  stemmer,
} = porterStemmer;

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

console.log(stemmer('fusses'))
console.log(stemmer('lies'))
console.log(stemmer('tuss'))
console.log(stemmer('suaaweqeds'))

console.log(stemmer('feds'))

//console.log(tokenizedTextWithoutStopWords);
