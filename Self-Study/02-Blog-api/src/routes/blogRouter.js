'use strict';

const router = require('express').Router();

const { category } = require('../controllers/blogControllers');

// Category
router.route('/categories')
      .get(category.list)
      .post(category.create);

router.route('/categories/:id')
      .get(category.read)
      .put(category.update)
      .delete(category.delete);

module.exports = router;
