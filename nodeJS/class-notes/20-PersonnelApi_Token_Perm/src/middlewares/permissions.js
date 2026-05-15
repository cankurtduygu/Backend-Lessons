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
    if (!(isAuthenticated(req) && req.user?.isAdmin))
      deny('You must be admin.');

    next();
  },

  isAdminOrLead: (req, res, next) => {
    // TODO
    // - if user admin can do anything
    // - if user not admin  but lead can do anything related to his own department
    if (!isAuthenticated(req)) deny('You must login.');
    if (!(req.user?.isAdmin || req.user?.isLead))
      deny('You must be admin or team lead.');

    next();
  },
};
