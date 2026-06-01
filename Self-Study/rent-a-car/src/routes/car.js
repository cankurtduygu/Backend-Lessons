"use strict";

const router = require("express").Router();

const car = require("../controllers/car");

router.route("/")
  .get(car.list)
  .post(car.create);

router.route("/:id")
  .get(car.read)
  .put(car.update)
  .delete(car.deletee);

module.exports = router;