'use strict';

const { CustomError } = require('../helpers');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Register"
        #swagger.description = 'Register with username, email and password for create a new user'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "email": "test@example.com",
                "password": "aA12345.?",
            }
        }
    */
    const { username, email, password, firstName, lastName } = req.body;

    if (!(username && email && password))
      throw new CustomError('Username, email and password are required.', 400);
    
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) throw new CustomError('Username or email already exists.', 400);

    const result = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).send({
      error: false,
      result,
    });
  },

  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "username": "test",
                "password": "aA12345.?",
            }
        }
    */
    const { username, email, password } = req.body;

    if (!((username || email) && password))
      throw new CustomError(
        'Username or email and password are required.',
        401
      );

    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    });
    // console.log(user);//test etmek amacli
    // res.send(user);
    if (!user) throw new CustomError('Wrong email/username or password', 401);

    if (!user.isActive)
      throw new CustomError('The user status is not active', 401);

    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

    // jwt.sign(payload, accessKey, options)
    //payload:token icine koyulacak bilgi
    const access = jwt.sign(accessData, process.env.ACCESS_KEY, {
      expiresIn: '15m',
    });

    // refresh token :id koyuyoruz cunku görevi sonradan yeni access token üretmek
    const refresh = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY, {
      expiresIn: '1d',
    });

    res.status(200).send({
      error: false,
      bearer: { access, refresh },
    });
  },

  logout: (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
        */

    res.status(200).send({
      error: false,
      message: 'Logout successfull.',
    });
  },

  refresh: async (req, res, next) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Refresh"
            #swagger.description = 'Refresh with refreshToken for get accessToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    refresh:"...refreshToken..."
                }
            }
        */

    const { refresh } = req.body;

    if (!refresh) throw new CustomError('Refresh token is missing.', 400);

    jwt.verify(refresh, process.env.REFRESH_KEY, async (err, refreshData) => {
      if (err) return next(new CustomError(`JWT Error: ${err.message}`, 401));

      const user = await User.findById(refreshData._id);

      if (!user)
        return next(new CustomError('Refresh data is not valid.', 401));

      if (!user.isActive)
        return next(new CustomError('This account is banned.', 401));

      const accessData = {
        _id: user._id,
        username: user.username,
        isActive: user.isActive,
        isAdmin: user.isAdmin,
      };

      const access = jwt.sign(accessData, process.env.ACCESS_KEY, {
        expiresIn: '15m',
      });

      res.status(200).send({
        error: false,
        bearer: { access },
      });
    });
  },
};
