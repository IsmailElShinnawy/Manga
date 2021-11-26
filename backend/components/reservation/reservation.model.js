const { model, Schema } = require("mongoose");

const reservationSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "account",
    },
    departureFlight: {
      type: Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
    returnFlight: {
      type: Schema.Types.ObjectId,
      ref: "flight",
      required: true,
    },
    departureFlightSeats: {
      type: [String],
      required: true,
    },
    returnFlightSeats: {
      type: [String],
      required: true,
    },
    departureFlightCabin: {
      type: String,
      required: true,
    },
    returnFlightCabin: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = model("reservation", reservationSchema);
