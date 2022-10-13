const express = require('express');

const router = express.Router();

const {
  readFile, getTalkerById, writeFile,
} = require('../services/funcitions');

const {
  tokenVal, nameVal, ageVal, talkVal, watchedAtVal, rateVal,
} = require('../services/validation');

router.get('/', async (_req, res) => {
  const response = await readFile('../talker.json');
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(503).json('Algo deu errado');
  }
});

router.get('/:id', async (req, res) => {
  const talkers = await readFile('../talker.json');
  const { id } = req.params;
  const response = getTalkerById(talkers, id);
  if (response) {
    res.status(200).json(response);
  } else {
    const failMsg = { message: 'Pessoa palestrante não encontrada' };
    res.status(404).json(failMsg);
  }
});

router.post('/', tokenVal, nameVal, ageVal, talkVal, watchedAtVal, rateVal, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readFile('../talker.json');
  const newItem = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await writeFile('../talker.json', newItem);
  res.status(201).json(newItem);
});

module.exports = router;