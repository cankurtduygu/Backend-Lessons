"use strict"
/*
    EXPRESSJS - BLOG Project with Mongoose
*/

const router = require('express').Router();
const category = require('../controllers/blogController');

/*-----------------------------------*/
//URL: /blogs/categories ->

router.route('/blogs/categories').get(category.list);



module.exports = router;