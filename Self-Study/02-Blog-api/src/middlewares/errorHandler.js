"use strict";

module.exports = (err, req, res, next) => {
  const statusCode = res.errStatusCode ?? 500;
  let msg = err.message;

  res.status(statusCode).send({
    error: true,
    message: msg,
    cause: err.cause,
  });
};
