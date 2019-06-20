const express = require('express');
const router = express.Router();
const addPageLayout = require('../views/addPage');
const { Page } = require('../models');
const { addPage } = require('../views');
const wikiPage = require('../views/wikipage');
const mainLayout = require('../views/main');

router.get('/', async (req, res) => {
  const pages = await Page.findAll({ raw: true });
  console.log(pages);
  res.send(mainLayout(pages));

});


router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.baddody.content,
  });

  try {
    await page.save();
    console.log(page);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});



router.get('/add', (req, res, next) => {
  res.send(addPageLayout());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    //res.json(page);
    res.send(wikiPage(page, req.params.author))
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
