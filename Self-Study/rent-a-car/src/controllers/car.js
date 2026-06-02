'use strict';

const Car = require('../models/cars');

module.exports = {
  list: async (req, res) => {
    const result = await res.getModelList(Car, ['createdId', 'updatedId']);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Car),
      result,
    });
  },

  create: async (req, res) => {
    req.body.createdId = req.user?._id;

    const result = await Car.create(req.body);

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    const result = await Car.findOne({ _id: req.params.id }).populate([
      'createdId',
      'updatedId',
    ]);

    if (!result) {
      throw new CustomError("Car not found", 404);
    }

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    req.body.updatedId = req.user?._id; //Kim update ediyor

    const result = await Car.findOneAndUpdate(
      { _id: req.params.id }, //URL’den gelen bilgi/id bilgisi
      req.body, //ne ile update edilecek
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(202).send({
      error: false,
      result, //bana update edilen datayı geri ver
    });
  },

  deletee: async (req, res) => {
    const result = await Car.deleteOne({ _id: req.params.id });

    if (!result.deletedCount) {
      return res.status(404).send({
        error: true,
        message: 'Data is not found or already deleted.',
      });
    }

    res.sendStatus(204);
  },
};
