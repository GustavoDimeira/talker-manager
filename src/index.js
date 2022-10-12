const express = require('express');
const bodyParser = require('body-parser');
const talkerRoute = require('./routes/talker');
const loginRoute = require('./routes/login');

const app = express();
app.use(bodyParser.json());

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
