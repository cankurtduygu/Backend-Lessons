'use strict';
const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

const dbConnection = require('./src/config/dbConnection');
dbConnection();

app.use(express.json());

const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    // maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days in milisecond. now this is a cookie
  }),
);

app.all('/', (req, res) => {
  res.send({
    message: 'WELCOME TO BLOG API',
  });
});

app.use('/blogs', require('./src/routes/blogRouter'));
app.use('/users', require("./src/routes/userRouter"));

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error Handler Middleware
app.use(require('./src/middlewares/errorHandler'));

app.listen(PORT, () => console.log('Running: http://127.0.0.1:' + PORT));
