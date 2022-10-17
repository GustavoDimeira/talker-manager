const mainFile = '../talker.json';

const path = require('path');
const fs = require('fs').promises;

const readFile = async (currentlyPath) => {
  const pathName = path.resolve(__dirname, currentlyPath);
  const response = JSON.parse(await fs.readFile(pathName, 'utf8'));
  return response;
};

const writeFile = async (currentlyPath, newItem) => {
  const file = await readFile(currentlyPath);
  const updated = JSON.stringify([...file, newItem]);
  await fs.writeFile('./src/talker.json', updated);
};

const getTalkerById = (talkers, id) => {
  const response = talkers.find((talk) => Number(talk.id) === Number(id));
  return response;
};

const edit = async (req) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const { id } = req.params;
    const newItem = {
      id: Number(id),
      name,
      age: Number(age),
      talk: {
        watchedAt,
        rate: Number(rate),
      },
    };
    const file = await readFile(mainFile);
    const old = getTalkerById(file, id);
    const i = file.indexOf(old);
    file.splice(i, 1, newItem);
    await fs.writeFile('./src/talker.json', JSON.stringify(file));
    return (newItem);
};

const delByToken = async (id) => {
  const file = await readFile(mainFile);
  const toRemove = getTalkerById(file, id);
  if (!toRemove) {
    return false;
  }
  const i = file.indexOf(toRemove);
  file.splice(i, 1);
  await fs.writeFile('./src/talker.json', JSON.stringify(file));
  return true;
};

module.exports = { readFile, writeFile, getTalkerById, delByToken, edit };