const express = require('express');

const router = express.Router();

const readFile = require('../services/readFile');

router.get('/', async (_req, res) => {
  const response = await readFile('../talker.json');
  res.status(200).json(response);
});

module.exports = router;