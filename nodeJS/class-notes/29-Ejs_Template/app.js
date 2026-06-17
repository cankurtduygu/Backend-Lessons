"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

/* ----------------------------------------------------- */
//Template:
//npm i ejs
//https://ejs.com

app.set('view engine', 'ejs');

app.set('views', './public')

/* ----------------------------------------------------- */
// Middlewares:

const cors = require("cors");


const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET, PUT, POST, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true, // allow cookies/auth headers
  optionsSuccessStatus: 200,
  maxAge: 86400, // cache preflight for 1 day
};

app.use(cors(corsOptions))

// accept form data
app.use(express.urlencoded({ extended: true }));

// Accept json data
app.use(express.json());

/* ----------------------------------------------------- */
// Routes:

app.all('/', (req, res)=> {
  // res.render('index')

  res.send({
  "message": "Welcome to ExpressJS - TODO Project with Sequelize",
  "api": "BASE_URL/api/todos",
  "view": "BASE_URL/view"
})
})



// Todo route
app.use("/api/todos", require("./src/routes/todoRouter"));
app.use("/view", require("./src/routes/todoRouter.view"));

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
