const express = require('express');
const router = express.Router();
const addPageLayout = require('../views/addPage');

router.get('/', (req, res) => {
  res.send('this is the wiki get');
});

router.post('/', (req, res, next) => {
  req.json(req.body);
  res.send('this is the wiki post');
});

router.get('/add', (req, res, next) => {
  res.send(addPageLayout());
});

module.exports = router;
