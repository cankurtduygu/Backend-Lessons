"use strict";

const mongoose = require("mongoose");
const { CustomError } = require("../helpers");

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError("Invalid ID format", 400);
  }

  next();
};