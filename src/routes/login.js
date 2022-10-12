const express = require('express');

const router = express.Router();

const crypto = require('crypto');

router.post('/', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;