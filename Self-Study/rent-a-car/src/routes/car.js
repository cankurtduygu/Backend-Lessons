"use strict";

const router = require("express").Router();

const car = require("../controllers/car");

const {isLogin, isAdmin } = require("../middlewares/permissions");

const idValidation = require("../middlewares/idValidation");

router.route("/available")
  .get(car.available);

router.route("/")
  .get(car.list)
  .post(isLogin, isAdmin, car.create);

router.route("/:id")
  .get(idValidation, car.read)
  .put( isLogin, isAdmin, idValidation, car.update)
  .delete(isLogin, isAdmin, idValidation, car.deletee);

module.exports = router;