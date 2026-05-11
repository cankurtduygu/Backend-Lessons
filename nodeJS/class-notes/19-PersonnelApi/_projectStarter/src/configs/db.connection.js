"use strict";

const mongoose = require("mongoose");

const dbConnection = function () {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("* DB Connected *"))
    .catch(() => console.log("! DB Not Connected !"));
};

module.exports = { dbConnection, mongoose };
