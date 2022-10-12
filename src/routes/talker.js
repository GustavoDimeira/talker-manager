const express = require('express');

const router = express.Router();

const readFile = require('../services/readFile');
const getTalkerById = require('../services/functions');

router.get('/', async (_req, res) => {
  const response = await readFile('../talker.json');
  res.status(200).json(response);
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

module.exports = router;