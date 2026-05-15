"use strict";

const Personnel = require("../models/personnel.model");
const { CustomError } = require("../utils/index");

module.exports = {
  list: async (req, res) => {
    let result;
    if(req.user?.isAdmin){
      result = await res.getModelList(Personnel);
    }else if(req.user?.isLead){
      result = await Personnel.find({ departmentId: req.user.departmentId });
    }
    

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Personnel),
      result,
    });
  },

  read: async (req, res) => {
    const result = await Personnel.findById(req.params.id);

    if (!result) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found.");

      throw new CustomError("Data is not found.", 404);
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
    
    // Todo - if team lead deleted assign new team lead automatically.

    if (!deletedCount) {
      // res.errStatusCode = 404;
      // throw new Error("Data is not found or already deleted.");

      throw new CustomError("Data is not found or already deleted.", 404);
    }

    res.sendStatus(204);
  },
};
