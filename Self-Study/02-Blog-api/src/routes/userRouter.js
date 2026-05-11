"use strict";


const router = require("express").Router();

const user = require("../controllers/userControllers");


// URL: /users ->

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