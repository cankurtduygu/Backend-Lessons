"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const jwt = require("jsonwebtoken");
const { CustomError } = require("../helpers");

module.exports = (req, res, next) => {
  req.user = null;

  const auth = req.headers?.authorization; // Bearer ...accessKey...
  const tokenArr = auth ? auth.split(" ") : null; // ['Bearer' '...accessKey...']

  if (tokenArr && tokenArr[0] === "Bearer") {
    // jwt.verify(jwt, secretKey, cb)

    // asycron
    jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (err, accessData) => {
      //   console.log(err);
      //   console.log(accessData);

      // if(error){
      //     throw new CustomError(`JWT Error: ${err.message}`, 401);
      // }

      // next icerisine yazdigmiz hatayi middleware errorhandlera yonlderiri
      if (err) return next(new CustomError(`JWT Error: ${err.message}`, 401));

      req.user = accessData;
    });
  }

  next();
};
