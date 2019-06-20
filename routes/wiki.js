const express = require('express');
const router = express.Router();
const addPageLayout = require('../views/addPage');
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res) => {
  res.send('this is the wiki get');
});

Page.beforeValidate((instance, object) => {});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPageLayout());
});

module.exports = router;
