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

const addNew = async (req, file, i, ida) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const id = Number(ida);
    const newItem = {
      name,
      id,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    await fs.writeFile('./src/talker.json', JSON.stringify([...file, newItem]));
};

const delByToken = async (id, toUpdate, req) => {
  const file = await readFile('../talker.json');
  const toRemove = getTalkerById(file, id);
  if (!toRemove) {
    return true;
  }
  const i = file.indexOf(toRemove);
  if (!toUpdate) {
    file.splice(i, 1);
    await fs.writeFile('./src/talker.json', JSON.stringify(file));
  } else {
    addNew(req, file, i, id);
  }
};

module.exports = { readFile, writeFile, getTalkerById, delByToken };