const mongoose = require("mongoose");

exports.updateFlight = async (req, res) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    depratureTerminal,
    arrivalTerminal,
  } = req.body;

  const oldFlightData = await mongoose.findById(req.params.id);
  console.log(oldFlightData);
  const updatedFlightData = {
    flightNumber: flightNumber || oldFlightData.flightNumber,
    departureTime: departureTime || oldFlightData.departureTime,
    arrivalTime: arrivalTime || oldFlightData.arrivalTime,
    economySeats: +economySeats || oldFlightData.economySeats,
    businessSeats: +businessSeats || oldFlightData.businessSeats,
    depratureTerminal: depratureTerminal || oldFlightData.depratureTerminal,
    arrivalTerminal: arrivalTerminal || oldFlightData.arrivalTerminal,
  };
  console.log(
    mongoose.findByIdAndUpdate({ _id: req.params.id }, updatedFlightData, {
      returnDocument: "after",
    })
  );
};
