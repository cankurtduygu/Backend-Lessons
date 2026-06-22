"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/ch11-blog-api")
    .connect(process.env?.MONGODB_URI || "mongodb://127.0.0.1:27017/ch11-blog-api")
    .then(() => {
      console.log("* DB Connected *");
      // Sync indexes to ensure unique constraints are enforced
      // mongoose.syncIndexes();
    })
    .catch((err) => console.log("! DB Connected !", err));
};

module.exports = dbConnection;
