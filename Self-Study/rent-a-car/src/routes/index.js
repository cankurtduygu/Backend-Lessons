"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./auth"));
// user:
router.use("/users", require("./user"));
// car: 
router.use("/cars", require("./car"));


// document:
// router.use("/documents", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;