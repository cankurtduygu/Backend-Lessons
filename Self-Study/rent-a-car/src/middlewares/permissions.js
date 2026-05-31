"use strict";

const { CustomError } = require("../helpers");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) return next();

    throw new CustomError("NoPermission: You must login.", 403);
  },
};