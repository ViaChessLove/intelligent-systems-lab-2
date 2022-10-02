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
  //TODO: B step
  switch (true) {
    case word.endsWith('a'):
      return word.slice(0, word.length - 1);
    default:
      return word;
  }
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
}