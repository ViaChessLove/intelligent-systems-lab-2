const readFile = (fileName) => {
  const fileStream = require('fs');
  const path = process.cwd();
  return fileStream.readFileSync(path + fileName).toString();
};

module.exports = {
  readFile
};
