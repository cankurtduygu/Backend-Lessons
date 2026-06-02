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

const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET, PUT, POST, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true, // allow cookies/auth header
  optionsSuccessStatus: 200,
  maxAge: 86400, // cache preflight for 1 day
};

app.use(cors(corsOptions));


// Accept json data
app.use(express.json());

/* ----------------------------------------------------- */
// Routes:

// Todo route
app.use('/api/todos', require("./src/routes/todoRouter"));

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
