const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
