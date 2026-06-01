"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

/* ----------------------------------------------------- */
// Middlewares:

// Accept json data
app.use(express.json());

/* ----------------------------------------------------- */
// Routes:
// const todoRouter = require('./src/routes/todoRouter');
// app.use(todoRouter)

// Todo route
app.use(require("./src/routes/todoRouter"));

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});
/* ----------------------------------------------------- */
// Error handler
app.use(require("./src/middlewares/errorHandler"));

/* ----------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
