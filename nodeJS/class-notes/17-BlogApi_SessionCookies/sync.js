"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const User = require("./src/models/userModel");
const { Category, Post } = require("./src/models/blogModel");

/* ------------------------------------------------------- */

module.exports = async () => {
  /* Exampla Data */
  // Deleted All Records:
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await Category.deleteMany().then(() =>
    console.log(" - Category Deleted All"),
  );
  await Post.deleteMany().then(() => console.log(" - Post Deleted All"));

  // Example User:
  const user = await User.create({
    email: "test@test.com",
    password: "12345678",
    firstName: "Test",
    lastName: "Test",
  });
  // Example Category:
  const Categoryy = await Category.create({
    name: "Test Category",
  });
  // Example Posts:G
  for (let key in [...Array(200)]) {
    await Post.create({
      userId: user._id,
      categoryId: Categoryy._id,
      title: `test ${key} title`,
      content: `test ${key} content`,
      published: Boolean(key % 2),
    });
  }

  // Finish:
  console.log("* Syncronized.");
};

/* ------------------------------------------------------- */
