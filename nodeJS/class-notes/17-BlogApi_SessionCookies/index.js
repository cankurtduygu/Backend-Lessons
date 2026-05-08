'use strict';
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require('express');
const app = express();

app.set('query parser', 'extended');



require('dotenv').config();
const PORT = process.env.PORT;
/* ------------------------------------ */

//* DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection();
require('./src/dbConnection')();
/* ------------------------------------ */
//* Middleware

// Parse body data
app.use(express.json());

const session = require('cookie-session');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

//SessionCookie
// $ npm i cookie-session

/* ------------------------------------ */
//* Routes

app.all('/', (req, res) => {
  res.send({
    message: 'WELCOME TO BLOG API',
    session: req.session,
  });
});

app.use('/blogs', require('./src/routes/blogRouter'));
app.use('/users', require('./src/routes/userRouter'));

/* ------------------------------------ */

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error handler
app.use(require('./src/middlewares/errorHandler'));

/* ------------------------------------ */
app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT));
//! syncronization (runs only once)
// require('./sync')()
