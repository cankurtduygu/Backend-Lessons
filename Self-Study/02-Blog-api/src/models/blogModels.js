const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {

    // _id
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { collection: "blogCategories" },

);

const Category = mongoose.model("Category", CategorySchema);

const PostSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },

    // createdAt
    // updatedAt
    // golge field,  db olmayan sadece response gosterdigimiz
  },
  { collection: "blogPosts", timestamps: true },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Category, Post };