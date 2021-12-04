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
    allEconomySeats: {
      type: [Boolean],
      required: true,
    },
    allBusinessSeats: {
      type: [Boolean],
      required: true,
    },
    departureTerminal: {
      type: String,
      required: true,
    },
    arrivalTerminal: {
      type: String,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    baggageAllowance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

flightSchema.index({
  flightNumber: 'text',
  departureTerminal: 'text',
  arrivalTerminal: 'text',
});

module.exports = model('Flight', flightSchema);
