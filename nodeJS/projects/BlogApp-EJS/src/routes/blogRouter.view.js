"use strict";

const router = require("express").Router();

const { category, post } = require("../controllers/blogController.view");

/* ---------------------------------------------- */
// URL: /blogs ->

// Category

router.get('/categories', category.list)
router.all('/categories/create', category.create);
router.all('/categories/:id/update', category.update)

router.get('/categories/:id', category.read)
router.get('/categories/:id/delete', category.delete)


// Post
router.get('/', post.list)

router.all('/create', post.create)

router.all('/:id/update', post.update)


router.get('/:id', post.read)

router.get('/:id/delete', post.delete)

/* ---------------------------------------------- */
module.exports = router;
