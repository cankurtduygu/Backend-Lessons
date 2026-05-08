'use strict';
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// call models
const { Category, Post } = require('../models/blogModel');

module.exports.category = {
  list: async (req, res) => {
    const result = await Category.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

  create: async (req, res) => {
    const result = await Category.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    // await Category.findOne({...filter})
    // const result = await Category.findOne({_id: req.params.id})
    const result = await Category.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

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
      // new: await Category.findById(req.params.id)
    });
  },

  delete: async (req, res) => {
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error('Data is not found or already deleted');
    }

    res.sendStatus(204);
  },
};

module.exports.post = {
  list: async (req, res) => {
    // await Post.find({..filter}, {select});

    //* Filter:
    // URL?filter[fieldName]=value1&filter[fieldName2]=value2
    const filter = req.query?.filter || {};

    //* Search:
    // URL?serach[fieldName]=value1&search[fieldName2]=value2
    const search = req.query?.search || {};
    // {field: { $regex: 'value', $options: 'i' }}
    // { title: 'test 4' }
    // { title: { $regex: 'test 4', $options: 'i' } }

    // console.log(search.title);
    // console.log(search['title']);

    // search.title = 'custom value'

    // search['title'] = {
    //   $regex: 'test 4',
    //   $options: 'i'
    // }

    for (let key in search) {
      search[key] = {
        $regex: search[key],
        $options: 'i',
      };
    }

    //* Sorting:
    // URL?sort[fieldName]=value1&sort[fieldName2]=value2

    const sort = req.query?.sort || {};

    //? Pagination:
    // URL?page=3&limit=10&skip=20
    //(page-1)*limit

     //* Page:
    let page = parseInt(req.query?.page);
    // console.log(page)
    page = page > 0 ? page : 1

    //* Limit:
    let limit = parseInt(req.query?.limit)

    limit = limit > 0 ? limit : 1

    //* Skip:
    let skip = parseInt(req.query?.skip)

    skip = skip > 0 ? skip : (page-1)*limit

    const result = await Post.find({ ...filter, ...search })
                             .sort(sort)
                             .skip(skip)
                             .limit(limit)
                             .populate(['categoryId', 'userId']);


    console.log(search);

    const result = await Post.find(search);
    // const result = await Post.find({}, { __v: 0 }).populate([
    //   { path: 'categoryId', select: '-__v' },
    //   { path: 'userId', select: '-password -createdAt -updatedAt -__v' },
    // ]);

    res.status(200).send({
      error: false,
      result,
    });
  },

  create: async (req, res) => {
    try {
      const result = await Post.create(req.body);

      res.status(201).send({
        error: false,
        result,
      });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error
        res.errStatusCode = 409;
        throw new Error(
          'This categoryId is already used. Each category can only have one post (one-to-one relation).'
        );
      }
      throw err;
    }
  },

  read: async (req, res) => {
    // await Post.findOne({...filter})
    // const result = await Post.findOne({_id: req.params.id})
    const result = await Post.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    // await Post.updateOne({...filter},{...data},{...?options})
    //* response from updateOne : {
    // "acknowledged": true, // if update methods ends successfuly.
    // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
    // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
    // "upsertedCount": 0, // Since nothing was inserted, no new ID.
    // "matchedCount": 1 // number of data matches with our filter.
    // }

    // const result = await Post.updateOne({ _id: req.params.id }, req.body);
    const result = await Post.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
      // new: await Post.findById(req.params.id)
    });
  },

  delete: async (req, res) => {
    const { deletedCount } = await Post.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error('Data is not found or already deleted');
    }

    res.sendStatus(204);
  },
};
