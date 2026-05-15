"use strict";

const Personnel = require("../models/personnel.model");
const Token = require("../models/token.model");
const { CustomError, passwordEncrypte } = require("../utils");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!(username || email) || !password)
      throw new CustomError(
        "username or email and password are required.",
        401,
      );

    // findOne makes set method works
    const user = await Personnel.findOne({
      $or: [{ username }, { email }],
      password,
    }).lean(); // returns plain js

    // console.log(user);

    if (!user) throw new CustomError("Wrong email/username or password.", 404);

    if (!user.isActive)
      throw new CustomError("The user status is not active.", 401);

     const {
      salary,
      description,
      phone,
      password: userPass,
      startedAt,
      createdAt,
      updatedAt,
      ...sessionData
    } = user;

    let token = await Token.findOne({ userId: user._id });

    // console.log(`Token: ${token}`);

    if(!token) {
        token = await Token.create({
            userId:user._id,
            token: passwordEncrypte(user._id + Date.now()),
        })
    }

    // console.log(`Token2: ${token}`);

    res.status(200).send({
      error: false,
      message: "Login is successfull",
      token:token.token,
      user: sessionData,
    });
  },

  logout: async (req, res) => {
    
    req.session = null;

    // console.log("req.user", req.user);

    const data = req.user ? await Token.deleteOne({userId: req.user._id}) : null;

    console.log(data)

    res.status(data?.deletedCount ? 200 : 400).send({
      error: !!!data?.deletedCount,
      message: data?.deletedCount
        ? "Logout is successfull."
        : "Logout not successfull.",
    });
  }
};
