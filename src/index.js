const express = require('express');
const routeTalker = require('./routes/talker');
const routeLogin = require('./routes/login');

const app = express();
app.use(express.json());
app.use('/talker', routeTalker);
app.use('/login', routeLogin);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});