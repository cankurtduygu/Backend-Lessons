"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;


/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Rent A Car API")
})


/* ----------------------------------------- */
const server = app.listen(PORT, async () => {
  const { dbConnection } = require("./configs/dbConnection");

  await dbConnection()
    .then(() => console.log(`running at: http://127.0.0.1:${PORT}`))
    .catch(() => {
      console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    });
});