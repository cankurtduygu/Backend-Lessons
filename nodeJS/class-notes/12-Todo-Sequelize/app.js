"use strict";
/* -------------------------------------------------------
        EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8001;

/* ----------------------------------------------------- */
// MIDDLEWARES:

// accept json data
app.use(express.json());

/* ----------------------------------------------------- */
app.use(errorHandler);


/* ----------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));