"use strict";

const router = require("express").Router();

const reservation = require("../controllers/reservations");

const {isLogin, isAdmin } = require("../middlewares/permissions");

const idValidation = require("../middlewares/idValidation");

router.route("/")
  .get(reservation.list)
  .post(isLogin, reservation.create);

router.route("/:id")
  .get(idValidation, reservation.read)
  .put( isLogin, idValidation, reservation.update)
  .delete(isLogin, isAdmin, idValidation, reservation.deletee);

module.exports = router;