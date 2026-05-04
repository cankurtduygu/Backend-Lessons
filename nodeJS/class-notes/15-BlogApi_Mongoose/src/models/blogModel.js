'use strict';
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
//~ Veri yapisi tanimlanacak.DB nasil olacak burda belirlenecek.
------------------------------------------------------- */

const mongoose = require('mongoose');
const { create } = require('../controllers/blogController');

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
  { collection: 'blogCategories' }
);

// todo Set model
//~ semayi modele ceviriyoruz. model icindeki category model adi categorySchema daha önceden tanimladigimiz schema
//~ const Category dedigimiz yer js icinde bir isim verdik. Bu modeli bu isim ile kullaniyoruz.
//~ mongoose.model(...) bize DB ile konusan bir obje verir. Biz bunu alip Category deiskenine koyuyoruz.Category sadece verid egil funclari olan obje
//!Burda semayi olusturarak mongoDB ile konusan model olustururoyuz.
const Category = mongoose.model('Category', categorySchema);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,//~ burasi baska bir dokumentin ID'si.
      ref: "Category", //~ burasi populate icin hangi modele bagli onu söylüyor.
      required: true,
    },

  },
  {
    collection: 'blogPost',
    timestamps: true,
  }
);
const Post = mongoose.model('Post', postSchema);

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
        unique: true, // Make it faster reachable in search.
        select: false, // if we dont want to send this field.
        index: true,
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
