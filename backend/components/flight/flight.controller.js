const mongoose = require("mongoose");

const updateFlight = async (req, res) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    airport,
  } = req.body;

  const oldFlightData = await mongoose.findById(req.params.id);
  console.log(oldFlightData);
  const updatedFlightData = {
    flightNumber: flightNumber || oldFlightData.flightNumber,
    departureTime: departureTime || oldFlightData.departureTime,
    arrivalTime: arrivalTime || oldFlightData.arrivalTime,
    economySeats: +economySeats || oldFlightData.economySeats,
    businessSeats: +businessSeats || oldFlightData.businessSeats,
    airport: +airport || oldFlightData.airport,
  };
  console.log(
    mongoose.findByIdAndUpdate({ _id: req.params.id }, updatedFlightData, {
      returnDocument: "after",
    })
  );
};

module.exports = {
  updateFlight,
};
