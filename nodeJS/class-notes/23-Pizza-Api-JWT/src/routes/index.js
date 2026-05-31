"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))


// order:
router.use('/orders', require('./order'))
// pizza:
router.use('/pizzas', require('./pizza'))
// topping:
router.use('/toppings', require('./topping'))

// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router