'use strict';

const User = require('../models/userModels');
const { passwordEncrypte } = require("../utils");

module.exports = {
  list: async (req, res) => {
    const result = await User.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

  create: async (req, res) => {
    const result = await User.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    const result = await User.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },

  delete: async (req, res) => {
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error('Data is not found or already deleted');
    }

    res.sendStatus(204);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email });

      if (user) {
        if (user.password == passwordEncrypte(password)) {
          req.session = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };

          if (req.body.rememberMe) {
            console.log('hits');
            req.session.rememberMe = true;
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
          }
          res.status(200).send({
            error: false,
            message: 'Login is successfull',
          });
        } else {
          res.errStatusCode = 404;
          throw new Error('Wrong email or password');
        }
      } else {
        res.errStatusCode = 404;
        throw new Error('Wrong email or password');
      }
    } else {
      res.errStatusCode = 401;
      throw new Error('Email and Password required.');
    }
  },

  logout: async (req, res) => {
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Logout is succesfull",
    });
  },
};
