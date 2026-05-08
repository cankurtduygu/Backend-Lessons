"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

const { category, post } = require("../controllers/blogController");

/* ---------------------------------------------- */
// URL: /blogs ->

// Category
router.route("/categories").get(category.list).post(category.create);

router
  .route("/categories/:id")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);

// Post
router.route("/posts").get(post.list).post(post.create);

router
  .route("/posts/:id")
  .get(post.read)
  .put(post.update)
  .delete(post.delete);

/* ---------------------------------------------- */
module.exports = router;
