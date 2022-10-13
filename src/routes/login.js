const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const emailVlidation = (req, res, next) => {
  const { email } = req.body;
  const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!email) {
    res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!filter.test(email)) {
    res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else {
      next();
  }
};

const passwordVlidation = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  } else if (password.length <= 6) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  } else {
      next();
  }
};

router.post('/', emailVlidation, passwordVlidation, (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;