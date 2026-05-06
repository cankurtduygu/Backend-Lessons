"use strict";
/*--------------------------------------
  ExpressJS -Blog Project with Mongoose
---------------------------------------*/

const User = require("../models/userModel");

module.exports = {
//~ all user list
  list: async (req, res) => {
    const result = await User.find();

    res.status(200).send({
      error: false,
      result,
    });
  },

//~ user create
  create: async (req, res) => {
    const result = await User.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  //~ user read
  read: async (req, res) => {
    const result = await User.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  //~ user update
  update: async (req, res) => {
    //* response from updateOne : {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).send({
      error: false,
      result,
      new: await User.findById(req.params.id)
    });
  },

  //~ user delete
  delete: async (req, res) => {
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });

    if (!deletedCount) {
      res.errStatusCode = 404;
      throw new Error("Data is not found or already deleted");
    }
    res.sendStatus(204);
  },
}