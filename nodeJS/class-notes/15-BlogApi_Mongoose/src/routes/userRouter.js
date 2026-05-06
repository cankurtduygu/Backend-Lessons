"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
//~ Endpoint tanimi
------------------------------------------------------- */

const router = require("express").Router();

const user = require("../controllers/userController");

/* ---------------------------------------------- */
// URL: /blogs ->

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .delete(user.delete);


/* ---------------------------------------------- */
module.exports = router;
