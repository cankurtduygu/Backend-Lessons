"use strict";

const { CustomError } = require("../helpers");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.user && req.user.isActive) return next();

    throw new CustomError("NoPermission: You must login.", 403);
  },

  isAdmin: (req, res, next) => {
     if (req.user && req.user.isActive && req.user.isAdmin) return next();

     throw new CustomError("NoPermission: You must be an admin.", 403);
  }
};