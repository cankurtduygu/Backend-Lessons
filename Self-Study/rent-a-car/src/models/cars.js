'use strict';

const { mongoose } = require('../configs/dbConnection');

const carSchema = new mongoose.Schema(
  {
    plateNumber: {
      //Plaka her arac icin tek olmali
      type: String,
      trim: true,
      required: true,
      unique: true,
      uppercase: true,
    },

    brand: {
      type: String,
      trim: true,
      required: true,
    },

    model: {
      type: String,
      trim: true,
      required: true,
    },

    year: {
      type: Number,
      required: true,
      max: new Date().getFullYear(),
    },

    isAutomatic: {
      type: Boolean,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    isPublish: {
      type: Boolean,
      default: true,
    },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    updatedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { collection: 'cars', timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
