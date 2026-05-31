"use strict";
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const { CustomError } = require("../helpers");
const User = require('../models/user');
const jwt = require("jsonwebtoken");

module.exports = {
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
        "Username or email and password are required.",
        401,
      );

    const user = await User.findOne({
      $or: [{ email }, { username }],
      password,
    });

    if (!user) throw new CustomError("Wrong email/username or password", 401);

    if(!user.isActive) throw new CustomError('The user status is not active', 401);

    // JWT
    const accessData = {
      _id: user._id,
      username: user.username,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };

     const access = jwt.sign(accessData, process.env.ACCESS_KEY, {
        expiresIn: "1m",
      });


    res.status(200).send({
        error:false,
        user
    })
  },

  logout: (req, res)=>{
    res.status(200).send({
        error:false,
        message: "Logout successfull."
    })
  }
};
