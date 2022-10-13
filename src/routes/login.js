const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const { emailValidation, passwordVlidation } = require('../services/validation');

router.post('/', emailValidation, passwordVlidation, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;