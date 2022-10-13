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

const writeFile = async (currentlyPath, newItem) => {
  const file = await readFile(currentlyPath);
  const updated = JSON.stringify([...file, newItem]);
  await fs.writeFile('./src/talker.json', updated);
};

module.exports = { readFile, getTalkerById, writeFile };