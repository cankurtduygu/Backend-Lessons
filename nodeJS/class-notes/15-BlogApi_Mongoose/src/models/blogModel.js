'use strict';

const mongoose = require('mongoose');

//* blogCategory Schema

//~create schema
// new mongoose.Schema({...atributes}, {...options})

const blogCategorySchema = new mongoose.Schema(
  {
    // _id mongoDB tarafindan olusturuluyor.Bunu ayriyetten belirtmemize gerek yok

    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: 'blogCategories' }
);

//~ Set model
const Category = mongoose.model('Category', blogCategorySchema);

module.exports = { Category };
