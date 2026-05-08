'use strict';
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const User = require('../models/userModel');
const { passwordEncrypte } = require('../utils');

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

    // 1. check credentials in req.body
    if (email && password) {
      // 2. check email in db
      const user = await User.findOne({ email: email });

      if (user) {
        // 3. check password match
        if (user.password == passwordEncrypte(password)) {
          // 4. set session
          req.session = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };

          // convert session to cookie
          if (req.body.rememberMe) {
            // console.log("hits");
            req.session.rememberMe = true;
            req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
          }

          res.status(200).send({
            error: false,
            message: "Login is successfull",
          });
        } else {
          res.errStatusCode = 404;
          throw new Error("Wrong email or password");
        }
      } else {
        res.errStatusCode = 404;
        throw new Error("Wrong email or password");
      }
    } else {
      res.errStatusCode = 401;
      throw new Error("Email and Password required.");
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
