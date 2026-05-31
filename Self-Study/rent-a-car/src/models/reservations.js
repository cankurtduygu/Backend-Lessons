'use strict';

const { mongoose } = require('../configs/dbConnection');

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    //! burda startDate ile endDate kontrolunu yapmak önemli controllerda bakacagim
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { collection: 'reservations', timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
