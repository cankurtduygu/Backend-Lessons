"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: deletee,
} = require("../controllers/personnel.controller");


// URL: /personnels
router.route("/").get(list).post(create);

router.route('/:id').get(read).put(update).delete(deletee);

module.exports = router;
