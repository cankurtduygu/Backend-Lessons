"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const express = require("express");
const app = express();

app.set('query parser', 'extended');

require("dotenv").config();
const PORT = process.env.PORT;
/* ------------------------------------ */
//* DB Connection

// const dbConnection = require('./src/dbConnection');
// dbConnection();
require("./src/dbConnection")();

/* ----------------------------------------------------- */
// Template:
// npm i ejs
// https://ejs.co/

app.set('view engine', 'ejs');

/* ------------------------------------ */

//* Midllewares

app.use(express.static("public"));
// Parse body data
app.use(express.json());

// QueryHandler
app.use(require('./src/middlewares/queryHandler'));


// SessionCookie
// https://expressjs.com/en/resources/middleware/cookie-session.html
// $ npm i cookie-session

const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    // maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days in milisecond. now this is a cookie
  }),
);



/* ------------------------------------ */
//* Routes

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/blogs", require("./src/routes/blogRouter"));
app.use("/view/blogs", require("./src/routes/blogRouter.view"));
app.use("/users", require("./src/routes/userRouter"));
app.use("/view/users", require("./src/routes/userRouter.view"));

/* ------------------------------------ */
// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error handler
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------ */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
//! syncronization (runs only once)
// require('./sync')()