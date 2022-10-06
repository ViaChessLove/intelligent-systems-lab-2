"use strict";

//TODO: реализовать одну из моделей поиска
//TODO: выдача при поиске должна выдавать название файла, сходные термы,

const stemmer = require('porter-stemmer').stemmer;
const readLine = require('readline-sync');
const lodash = require('lodash');

const constants = require('./constants');
const utils = require('./utils');


const {
  countBy,
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
  content: content.filter((word) => filterByStopWords(word, stopWords)),
}));

const stemmedTokenizedText = tokenizedTextWithoutStopWords.map(({title, content}) => ({
  title,
  content: content.map((word) => {
    return word
    .split('-')
    .map((word) => stemmer(word))
    .join('-');
  }),
}));

const weightedStemmedText = stemmedTokenizedText.map(({title, content}) => ({
  title,
  content: countBy(content),
}));

const relevantWeightedText = weightedStemmedText.map(({title, content}) => {
  const contentSortedByDescending = Object.fromEntries(
    Object
    .entries(content)
    .sort(([, current], [, checkable]) => checkable - current)
  );

  return {
    title,
    content: contentSortedByDescending
  }
});

console.log(relevantWeightedText);

const searchableString = question("Input the line to search: ");

const arrayOfSearchableString = searchableString.split(' ');

console.log(arrayOfSearchableString);