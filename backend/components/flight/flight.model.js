const { Schema, model } = require('mongoose');

const flightSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    economySeats: {
      type: Number,
      required: true,
    },
    businessSeats: {
      type: Number,
      required: true,
    },
    airport: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Flight', flightSchema);
