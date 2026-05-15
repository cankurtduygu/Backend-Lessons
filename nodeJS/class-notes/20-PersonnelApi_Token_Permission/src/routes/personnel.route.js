'use strict';

const router = require('express').Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require('../controllers/personnel.controller');
const { isLogin, isAdmin, isAdminOrLead} = require('../middlewares/permissions');

// URL: /personnels
router.route('/')
      .get(isLogin, isAdminOrLead, list)
      .post(isLogin, isAdmin, create);

router
  .route('/:id')
  .get(isLogin, read)
  .put(isLogin, isAdmin, update)
  .delete(isLogin, isAdminOrLead, deletee);

module.exports = router;
