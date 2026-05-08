"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

const user = require("../controllers/userController");

/* ---------------------------------------------- */
// URL: /users ->

// User CRUD
router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .delete(user.delete);

router.post("/login", user.login);
router.all("/logout", user.logout);

/* ---------------------------------------------- */
module.exports = router;
