'use strict';
const { CustomError } = require('../utils/index');

const isAuthenticated = (req) => req.user && req.user?.isActive;

const deny = (message) => {
  throw new CustomError(`NoPermission: ${message} `, 401);
};

module.exports = {
  isLogin: (req, res, next) => {
    if (!isAuthenticated(req)) deny('You must login.');

    next();
  },

  isAdmin: (req, res, next) => {
    if (!(req.user?.isAdmin))
      deny('You must be admin.');

    next();
  },

  isAdminOrLead: (req, res, next) => {

   if (!(req.user?.isAdmin || req.user?.isLead))
      deny('You must be admin or team lead.');
     next();
 },
};
