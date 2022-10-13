const emailVal = (req, res, next) => {
  const { email } = req.body;
  const filter = /^([a-zA-Z0-9])+@([a-zA-Z0-9])+.+([a-zA-Z0-9])/;
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

const passwordVal = (req, res, next) => {
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

const tokenVal = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
      res.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16) {
      res.status(401).json({ message: 'Token inválido' });
  } else {
    next();
  }
};

const nameVal = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
};

const ageVal = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }
};

const talkVal = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else {
    next();
  }
};

const watchedAtVal = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dataFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!watchedAt) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } else if (!dataFormat.test(watchedAt)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
};

const rateVal = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } else if (Number(rate) < 1 || Number(rate) > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    next();
  }
};

module.exports = {
  tokenVal, emailVal, passwordVal, nameVal, ageVal, talkVal, watchedAtVal, rateVal,
};