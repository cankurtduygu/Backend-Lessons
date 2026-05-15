"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require("../controllers/personnel.controller");
const { isLogin, isAdmin, isAdminOrLead } = require("../middlewares/permissions");



// URL: /personnels
router.route("/").get(isAdminOrLead, list).post(create);

router
  .route("/:id")
  .get(isLogin, read)
  .put(isAdminOrLead, update)
  .delete(isAdmin, deletee);

module.exports = router;
