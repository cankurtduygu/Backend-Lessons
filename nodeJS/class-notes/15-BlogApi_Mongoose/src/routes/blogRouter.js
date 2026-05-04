"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
//~ Endpoint tanimi
------------------------------------------------------- */

const router = require("express").Router();

const category = require("../controllers/blogController");
const post = require("../controllers/blogController");

/* ---------------------------------------------- */
// URL: /blogs ->

 router.route("/blogs/categories")
       .get(category.list)
       .post(category.create);

 router.route("/blogs/categories/:id")
       .get(category.read)
       .put(category.update)
       .delete(category.delete);

//?  ************************************************/

 router.route("/blogs/posts")
       .get(post.list)
       .post(post.create);

  router.route("/blogs/posts/:id")
       .get(post.read)
       .put(post.update)
       .delete(post.delete);

/* ---------------------------------------------- */
module.exports = router;
