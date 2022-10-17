const express = require('express');

const router = express.Router();

const path = '../talker.json';

const {
  readFile, writeFile, getTalkerById, delByToken, editTalker, findByName,
} = require('../services/funcitions');

const {
  tokenVal, nameVal, ageVal, talkVal, watchedAtVal, rateVal,
} = require('../services/validation');

router.get('/', async (_req, res) => {
  const response = await readFile(path);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(503).json('Algo deu errado');
  }
});

router.get('/search', tokenVal, async (req, res) => {
  const { q } = req.query;
  const talkers = await findByName(q);
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const talkers = await readFile(path);
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
  const talkers = await readFile(path);
  const newItem = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await writeFile(path, newItem);
  res.status(201).json(newItem);
});

router.delete('/:id', tokenVal, async (req, res) => {
  const { id } = req.params;
  const teste = await delByToken(id);
  if (!teste) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  res.status(204).json();
});

router.put('/:id', tokenVal, nameVal, ageVal, talkVal, watchedAtVal, rateVal, async (req, res) => {
  const newTalker = await editTalker(req);
  res.status(200).json(newTalker);
});

module.exports = router;
