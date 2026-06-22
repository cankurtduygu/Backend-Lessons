"use strict";

module.exports = (err, req, res, next) => {
  const statusCode = res.errStatusCode ?? 500;
  let msg = err.message;
  // // console.log(err);
  // if (err.code === 11000) {
  //   // Duplicate key error
  //   msg =
  //     "This categoryId is already used. Each category can only have one post (one-to-one relation).";
  // } else if (err.code == 12000) {
  //   msg = "something ..";
  // }

  res.status(statusCode).send({
    error: true,
    message: msg,
    cause: err.cause,
    // stack: err.stack,
  });
};
