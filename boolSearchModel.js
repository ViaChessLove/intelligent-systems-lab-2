const searchDataByRequest = (request, data) => {
  const weights = [];
  const similarTerms = [];

  for (let i = 0; i < data.length; i++) {
    weights.push(0);
    similarTerms.push('');
  };

  data.forEach(({content}, textIndex) => {
    const searchibleContent = (Object.entries(content));
    request.forEach((word) => {
      searchibleContent
        .find((content) => (
          content[0] === word 
          && (weights[textIndex] += content[1])
          && (similarTerms[textIndex] += content[0] + '; ')
        ));
    });
  });

  return {
    weights,
    similarTerms,
  };
}

const getResponse = (request, data) => {
  const {
    weights,
    similarTerms,
  } = searchDataByRequest(request, data);
  const result = weights.map((weight, weightIndex) => {
    let indexOfMostRelevant = weights.indexOf(Math.max(...weights));
    weights[indexOfMostRelevant] = -1;
    return `${weightIndex + 1}. data - ${data[indexOfMostRelevant].title} similarTerms - ${similarTerms[indexOfMostRelevant]}`
  });
  return result.join('\r\n');
};

module.exports = {
  getResponse,
};
