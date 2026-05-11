"use strict";

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Personnel);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },
  read: async (req, res) => {
    const result = await Personnel.findById(req.params.id);

    if (!result) {
      res.errStatusCode = 404;
      throw new Error("Data is not found.");
    }

    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await Personnel.create(req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Personnel.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
    });
  },
  delete: async (req, res) => {
    const { deletedCount } = await Personnel.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted.");
    }

    res.sendStatus(204);
  },
};
