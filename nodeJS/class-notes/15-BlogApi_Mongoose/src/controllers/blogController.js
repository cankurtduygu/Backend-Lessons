"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
//~ CRUD islemleri burada Modeli kullanacak
------------------------------------------------------- */

// call models
const { Category, Post } = require("../models/blogModel");

module.exports = {
//~ all category list
  list: async (req, res) => {
    const result = await Category.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

//~ category create
  create: async (req, res) => {
    const result = await Category.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },


  //~ category read
  read: async (req, res) => {
    // await Category.findOne({...filter})
    // const result = await Category.findOne({_id: req.params.id})
    const result = await Category.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },


//! UPDATE
  update: async (req, res) => {
    // await Category.updateOne({...filter},{...data},{...?options})
    //* response from updateOne : {
    // "acknowledged": true, // if update methods ends successfuly.
    // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
    // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
    // "upsertedCount": 0, // Since nothing was inserted, no new ID.
    // "matchedCount": 1 // number of data matches with our filter.
    // }

    // const result = await Category.updateOne({ _id: req.params.id }, req.body);
    const result = await Category.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
      new: await Category.findById(req.params.id)
    });
  },


  //! DELETE

  delete: async (req, res) => {
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted");
    }

    res.sendStatus(204);
  },

/*************************** POST ********************************** */
  //~ all post list
  list: async (req, res) => {
    const result = await Post.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

  //~ post create
  create: async (req, res) => {
    const result = await Post.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  //~ post read
  read: async (req, res) => {
    // await Category.findOne({...filter})
    // const result = await Category.findOne({_id: req.params.id})
    const result = await Post.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  //~ post update
  update: async (req, res) => {
    //* response from updateOne : {
    const result = await Post.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
      new: await Post.findById(req.params.id)
    });
  },

  //~ post delete
  delete: async (req, res) => {
    const { deletedCount } = await Post.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted");
    }

    res.sendStatus(204);
  },
};

