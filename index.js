"use strict";

//TODO: выдача при поиске должна выдавать название файла, сходные термы,

const { question } = require('readline-sync');
const { countBy } = require('lodash');

const {
  stopWords,
  fileTitles,
} = require('./constants');
const{
  fillTextWithContentFromData,
  filterByStopWords,
  tokenizeText,
  stemText,
} = require('./utils');
const { getResponse } = require('./vectorSearchModel');

const fileTexts = [];

fileTitles.forEach((title) => fillTextWithContentFromData(fileTexts, title));

const tokenizedText = fileTexts.map(({title, content}) => ({
  title,
  content: tokenizeText(content),
}));

const tokenizedTextWithoutStopWords = tokenizedText.map(({title, content}) => ({
  title,
  content: content.filter((word) => filterByStopWords(word, stopWords)),
}));

const stemmedTokenizedText = tokenizedTextWithoutStopWords.map(({title, content}) => ({
  title,
  content: stemText(content),
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
  };
});


const searchingRequest = question("Input the line to search: ");

const tokenizedSearchableRequest = tokenizeText(searchingRequest);

const filterTokenizedSearchableRequest = tokenizedSearchableRequest.filter((word) => filterByStopWords(word, stopWords));

const stemmedTokenizedRequest = stemText(filterTokenizedSearchableRequest);

console.log(getResponse(stemmedTokenizedRequest, relevantWeightedText));