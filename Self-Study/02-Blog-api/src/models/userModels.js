'use strict';

const mongoose = require('mongoose');

const { passwordEncrypte } = require("../utils");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim:true,
      unique: [true, "This email already taken."],
      validate: [
        (email) => {
          return email.includes("@") && email.includes(".");
        },
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      set: passwordEncrypte,
    },
  },
  { collection: 'users', timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
