'use strict';

const Reservation = require('../models/reservations');
const Car = require('../models/cars');
const { CustomError } = require('../helpers');

module.exports = {
  list: async (req, res) => {
    const customFilter = {};

    if (!req.user.isAdmin) {
      customFilter.userId = req.user._id;
    }

    const result = await res.getModelList(
      Reservation,
      ['userId', 'carId'],
      customFilter
    );

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation, customFilter),
      result,
    });
  },

  create: async (req, res) => {
    const { carId, startDate, endDate } = req.body;
    // console.log(`New reservation created for car ${carId} from ${startDate} to ${endDate}.`);

    const car = await Car.findById(carId);
    if (!car) throw new CustomError('Car not found.', 404);

    if (!startDate || !endDate) {
      throw new CustomError('Start date and end date are required.', 400);
    }

    //Date'ler string olarak gelirse Date objesine çevirelim
    if (new Date(startDate) >= new Date(endDate)) {
      throw new CustomError('Start date must be before end date.', 400);
    }

    const sameClientConflict = await Reservation.findOne({
      userId: req.user?._id,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) },
    });

    if (sameClientConflict) {
      throw new CustomError(
        'You already have a reservation for these dates.',
        400
      );
    }

    const conflictReservation = await Reservation.findOne({
      carId,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) },
    });

    if (conflictReservation) {
      throw new CustomError('Car is already reserved for these dates.', 400);
    }

    const result = await Reservation.create({
      userId: req.user?._id,
      carId,
      startDate,
      endDate,
    });

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    const filter = {
      _id: req.params.id,
    };

    if (!req.user.isAdmin) {
      filter.userId = req.user?._id;
    }

    const result = await Reservation.findOne(filter).populate([
      'userId',
      'carId',
    ]);

    if (!result) {
      throw new CustomError('Reservation not found', 404);
    }

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    delete req.body.userId;
    
    const result = await Reservation.findOneAndUpdate(
      { _id: req.params.id }, //URL’den gelen bilgi/id bilgisi
      req.body, //ne ile update edilecek
      {
        runValidators: true,
        new: true,
      }
    );

    if (!result) {
      throw new CustomError('Reservation not found.', 404);
    }

    res.status(202).send({
      error: false,
      result, //bana update edilen datayı geri ver
    });
  },

  deletee: async (req, res) => {
    const result = await Reservation.deleteOne({ _id: req.params.id });

    if (!result.deletedCount) {
      throw new CustomError('Reservation not found or already deleted.', 404);
    }

    res.sendStatus(204);
  },
};
