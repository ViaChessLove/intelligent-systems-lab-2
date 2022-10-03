const utils = require('./utils');

const {
  countCharactersInString
} = utils;

const isVowelLetter = (letter) => {
  switch (letter) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
      return true;
    default:
      return false;
  };
};

const checkWordContainsVowel = (word) => {
  word
  .split('')
  .forEach((letter) => {
    console.log('q')
    if (isVowelLetter(letter)) {
      return true;
    }
  });
  console.log('?')
  return false;
};

const isConsonantLetter = (letter) => {
  return !isVowelLetter(letter);
};

//check y is vowel
const checkConsonantByIndex = (word, index) => {
  const letter = word[index];
  if (isConsonantLetter(letter)) {
    if ((letter === 'y') && (isConsonantLetter(word[index - 1]))) {
      return false;
    }
    return true;
  }
  return false;
};

const getForm = (word) => {
  word = word.toLowerCase();
  let form = [];
  for (let i = 0; i < word.length; i++) {
    if (checkConsonantByIndex(word, i)) {
      if (i !== 0) {
        if (form[-1] !== 'C') {
          form.push('C');
          continue;
        };
      }
      form.push('C');
      continue;
    }
    if (i !== 0) {
      if (form[-1] !== 'V') {
        form.push('V');
        continue;
      }
    }
    form.push('V');
    continue;  
  };
  return form.join('');
};

const getM = (word) => {
  const form = getForm(word);
  const consonantAfterVowelValidation = /VC/g;
  return (form.match(consonantAfterVowelValidation) || []).length;
};

const firstAStep = (word) => {
  switch (true) {
    case (word.endsWith('sses') || word.endsWith('ies')):
      return word.slice(0, word.length - 2);
    case word.endsWith('ss'):
      return word;
    case word.endsWith('s'):
      return word.slice(0, word.length - 1);
    default:
      return word;
  };
};

const firstBStep = (word) => {
  let flag = false;
  let wordWithoutSuffix = '';
  switch (true) {
    case word.endsWith('eed'):
      wordWithoutSuffix = word.slice(0, word.lastIndexOf('eed'));
      if (getM(wordWithoutSuffix) > 0) {
        word = `${wordWithoutSuffix}ee`;
      }
      break;
    case word.endsWith('ed'):
      wordWithoutSuffix = word.slice(0, word.lastIndexOf('ed'));
      console.log(wordWithoutSuffix);
      if (checkWordContainsVowel(wordWithoutSuffix)) {
        word = wordWithoutSuffix;
        flag = true;
      }
      break;
    case word.endsWith('ing'):

      break;
    default:
      break;
  }
  
  return word;
};

const firstCStep = (word) => {

};

const secondStep = (word) => {

};

const thirdStep = (word) => {

};

const fourthStep = (word) => {

};

const fivthAStep = (word) => {

};

const fivthBStep = (word) => {

};

const stemmer = (word) => {
  const steps = [
    firstAStep,
    firstBStep,
    //firstCStep,
    //secondStep,
    //thirdStep,
    //fourthStep,
    //fivthAStep,
    //fivthBStep,
  ];
  steps.forEach((step) => word = step(word));
  return word;
};

module.exports = {
  stemmer,
  getM,
}