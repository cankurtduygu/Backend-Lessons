"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const mongoose = require("mongoose");

/*------------------------------------------------------- */
//* blogCategory Schema

// create schema
// new mongoose.Schema({...atribudes}, {...options})
const categorySchema = new mongoose.Schema(
  {
    // _id

    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogCategories" },
);

// Set model
const Category = mongoose.model("Category", categorySchema);

/*------------------------------------------------------- */
//* blogPost Schema

const postSchema = new mongoose.Schema(
  {
    categoryId: {
      // default relation: ManyToOne
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      // unique: true // converts to OneToOne relation.
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
    published: {
      type: Boolean,
      default: true,
    },

    // createdAt
    // updatedAt
    // golge field,  db olmayan sadece response gosterdigimiz
  },
  { collection: "blogPosts", timestamps: true },
);

// Set model
const Post = mongoose.model("Post", postSchema);

module.exports = { Category, Post };

/* -------------------------------------------------------*
//* Sample
// Create Schema
// new mongoose.Schema({fields}, {options})

const nameSchema = new mongoose.Schema({

    //_id: // auto created and increment

    fieldName1: Number, // Short hand usage
    fieldName2: Boolean,

    fieldName3: {
        type: String, // JS Data type
        default: null,
        trim: true, // Cuts the space before & after.
        unique: true, 
        select: false, // if we dont want to send this field.
        index: true, // Make it faster reachable in search.
        // required: true,
        required: [true, 'custom error message'],
        // enum: ['1', '2,', '3'],
        // enum: [1, 2, 3],
        enum: [[1, 2, 3], 'custom error message'],
        // validate: () => true, // if returns false it will throw a validation error.
        validate: [() => true, 'custom error message'],
        get: () => { return data }, // it works default when we do read operation
        set: () => { return data } // it works default when we do create or update operations
    }

}, {
    collection: 'collectionName', // Table name
    timestamps: true // createdAt & updatedAt
});

// Convert Schema to Model
// mongoose.model('ModelName', nameSchema)

const ModelName = mongoose.model('ModelName', nameSchema);
/*------------------------------------------------------- */
