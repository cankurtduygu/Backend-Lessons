'use strict';

const router = require('express').Router();
const { list, create, read, update, deletee } = require('../controllers/user');
const idValidation = require("../middlewares/idValidation");
const { isLogin, isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */
// URL: /users

router.route('/')
    .get(isLogin, isAdmin, list)
    .post(isLogin, create);

router.route('/:id')
    .get(isLogin, isAdmin,idValidation, read)
    .put(isLogin, isAdmin, idValidation, update)
    .delete(isLogin, isAdmin, idValidation, deletee);
/* ------------------------------------------------------- */
module.exports = router;
