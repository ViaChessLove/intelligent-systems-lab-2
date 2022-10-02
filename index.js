"use strict";

const readLine = require('readline-sync');
const constants = require('./constants');
const utils = require('./utils');

const {
  question,
} = readLine;

const {
  stopWords,
  splitableSymbols,
} = constants;

const {
  readFile,
} = utils;



const fileText = question('Input the file title: ');
const textPath = `/data/${fileText}.txt`;
const fileContent = readFile(textPath);

console.log(fileContent);

const formattedContentToLowerCase = fileContent.toLowerCase();
