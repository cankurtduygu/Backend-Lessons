"use strict";

const router = require("express").Router();
const { register, login, logout, refresh } = require("../controllers/auth");
/* ------------------------------------------------------- */
// URL: /auth


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
/* ------------------------------------------------------- */
module.exports = router;
