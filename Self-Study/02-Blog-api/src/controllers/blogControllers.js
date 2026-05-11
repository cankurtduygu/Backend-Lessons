'use strict';

const { Category, Post } = require('../models/blogModels');

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
    const result = await Category.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    const result = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({
      error: false,
      result,
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
    const result = await Post.find({}, { __v: 0 }).populate([
      { path: 'categoryId', select: '-__v' },
      { path: 'userId', select: '-password -createdAt -updatedAt -__v' },
    ]);

    res.status(200).send({
      error: false,
      result,
    });
  },

  create: async (req, res) => {
    const { _id } = req.session;

    if (!_id) {
      res.errStatusCode = 401;
      throw new Error('You must login to procced this action.');
    }

    req.body.userId = _id;

    const result = await Post.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    const { _id } = req.session;

    if (!_id) {
      res.errStatusCode = 401;
      throw new Error('You must login to procced this action.');
    }

    const result = await Post.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    const { _id } = req.session;

    // check if user logged in
    if (!_id) {
      res.errStatusCode = 401;
      throw new Error('You must login to procced this action.');
    }

    const result = await Post.findByIdAndUpdate(req.params.id, req.body);

    if (result.userId.toString() !== _id) {
      res.errStatusCode = 403;
      throw new Error('You are not authorized to update this post.');
    }

    res.status(200).send({
      error: false,
      result,
    });
  },

  delete: async (req, res) => {
    const { _id } = req.session;

    // check if user logged in
    if (!_id) {
      res.errStatusCode = 401;
      throw new Error('You must login to procced this action.');
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      res.errStatusCode = 404;
      throw new Error('Data is not found or already deleted');
    }
    if (post.userId.toString() !== _id) {
      res.errStatusCode = 403;
      throw new Error('You are not authorized to delete this post.');
    }

    await Post.deleteOne({ _id: req.params.id });

    res.sendStatus(204);
  },
};
