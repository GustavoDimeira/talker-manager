const path = require('path');
const fs = require('fs').promises;

const readFile = async (currentlyPath) => {
  const pathName = path.resolve(__dirname, currentlyPath);
  const response = JSON.parse(await fs.readFile(pathName, 'utf8'));
  return response;
};

module.exports = readFile;