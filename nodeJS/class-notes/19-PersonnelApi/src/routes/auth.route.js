"use strict";

const router = require("express").Router();
const { login } = require("../controllers/auth.controller");

// URL: /auth
router.post("/login", login);

module.exports = router;