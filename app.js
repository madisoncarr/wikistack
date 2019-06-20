const express = require('express');
const app = express();
const morgan = require('morgan');
const main = require('./views/main');
const { db } = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const init = async () => {
  await models.db.sync({});

  const PORT = 1337;
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
};

init();
