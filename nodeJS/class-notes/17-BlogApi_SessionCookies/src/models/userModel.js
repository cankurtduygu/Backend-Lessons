"use strict";
/* -------------------------------------------------------
            EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");

// Password Encryption:
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
// const { pbkdf2Sync } = require("node:crypto");

// const passwordEncrypte = function (password) {
//   // require('crypto').randomBytes(32).toString('hex')
//   const salt =
//     "d4dfe25b5e9fcf40a9ca446d0341ba442dd85f79d05d6852c7ed8c05114b777a";
//   const iteration = 100000;
//   const keylen = 32; // write for 64
//   const digest = "sha512";

//   // pbkdf2Sync returns buffer string.
//   return pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex");
// };

const { passwordEncrypte } = require("../utils");

const userSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,

    email: {
      type: String,
      trim: true,
      required: true,
      //   unique: true,
      unique: [true, "This email already taken."],
      //   How validate works ?

      //   validate: () => {
      //     return false; // if validates retuns false it throws validation error.
      //   },

      //   validate: (email) => {
      //     // console.log(email.includes('@') && email.includes('.'));
      //     if (email.includes("@") && email.includes(".")) {
      //       return true;
      //     }
      //     return false;
      //   },

      validate: [
        (email) => {
          return email.includes("@") && email.includes(".");
        },
        "Please enter a valid email address.",
      ],

      //   match: [/.+@.+\..+/, "Please enter a valid email address."],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      //? How set method works?
      //   set: (password) => {
      //     // return password;
      //     return "ondia"; // whatever value set method returns it will be save to DB.
      //   },

      //? Using crypto module in set method
      //   set: (password) => {
      //     return passwordEncrypte(password);
      //   },
      set: passwordEncrypte,
    },
  },
  { collection: "users", timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
