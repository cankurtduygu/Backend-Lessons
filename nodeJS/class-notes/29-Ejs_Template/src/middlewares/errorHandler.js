'use strict'

module.exports = (err, req, res, next) => {
  // console.log(res.errStatusCode);
  const statusCode = res.errStatusCode ?? 500;

  const data = {
    error: true,
    message: err.message,
    cause: err.cause
  }

  if(req.originalUrl.startsWith('/api')){
    res.status(statusCode).send(data);
  }else{
    res.render('errors', { data })
  }
};