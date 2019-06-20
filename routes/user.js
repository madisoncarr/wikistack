const express = require('express');
const router = express.Router();
const userList = require('../views/userList');
const userPages = require('../views/userPages');
const { User } = require('../models');

router.get('/user', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
    });
    res.send(userPages(user));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
