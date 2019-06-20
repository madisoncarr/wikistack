const express = require('express');
const app = express();
const morgan = require('morgan');
const main = require('./views/main')

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send(main());
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
