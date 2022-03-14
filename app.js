const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

app.use((req, res, next) => {
  req.user = {
    _id: '622f5c2da8d8030ea121d7fa',
  };
  next();
});

app.use('/users', routerUser);
app.use('/cards', routerCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});
