const express = require('express');

const router = express.Router();

const { readFile, getTalkerById } = require('../services/funcitions');

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

module.exports = router;