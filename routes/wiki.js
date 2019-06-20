const express = require('express');
const router = express.Router();
const addPageLayout = require('../views/addPage');
const { Page } = require('../models');
const { User } = require('../models');
const { addPage } = require('../views');
const wikiPage = require('../views/wikipage');
const mainLayout = require('../views/main');

router.get('/', async (req, res) => {
  const pages = await Page.findAll({ raw: true });
  console.log(pages);
  res.send(mainLayout(pages));
});

router.post('/', async (req, res, next) => {
  try {
    console.log('THIS IS OUR REC BODY PAGE!!!!!', req.body.name);
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    const [user, otherThing] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    page.setAuthor(user);

    // await page.save();
    // await user.save();
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
      where: { slug: req.params.slug },
    });
    const user = await User.findOne({
      where: { id: page.authorId },
    });
    //res.json(page);
    res.send(wikiPage(page, user));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
