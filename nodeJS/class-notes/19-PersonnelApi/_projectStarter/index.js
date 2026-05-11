"use strict";
/* -------------------------------------------------------
                EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const app = express();

app.set("query parser", "extended");

require("dotenv").config();
const PORT = process.env.PORT;

/* ----------------------------------------- */
// DB Connection
const { dbConnection } = require("./src/configs/db.connection");
dbConnection();

/* ----------------------------------------- */
// Parse body data
app.use(express.json());

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

// SessionCookie
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRET_KEY }));

/* ----------------------------------------- */

// home path
app.all("/", (req, res) => {
  res.send({
    message: "WELCOME TO BLOG API",
    session: req.session,
  });
});

/* ----------------------------------------- */
// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error handler
app.use(require("./src/middlewares/errorHandler"));
/* ----------------------------------------- */
app.listen(PORT, () => console.log(`running at: http:127.0.0.1:${PORT}`));
