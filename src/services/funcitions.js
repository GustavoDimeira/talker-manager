const path = require('path');
const fs = require('fs').promises;

const readFile = async (currentlyPath) => {
  const pathName = path.resolve(__dirname, currentlyPath);
  const response = JSON.parse(await fs.readFile(pathName, 'utf8'));
  return response;
};

const getTalkerById = (talkers, id) => {
  const response = talkers.find((talk) => Number(talk.id) === Number(id));
  return response;
};

module.exports = { readFile, getTalkerById };