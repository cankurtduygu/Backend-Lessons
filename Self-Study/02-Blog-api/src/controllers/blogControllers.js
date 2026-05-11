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
