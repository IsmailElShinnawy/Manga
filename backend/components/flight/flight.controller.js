const Flight = require("./flight.model");

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

  const oldFlightData = await Flight.findById(req.params.id);
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
    Flight.findByIdAndUpdate({ _id: req.params.id }, updatedFlightData, {
      returnDocument: "after",
    })
  );
};
exports.create = async (req, res) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    departureTerminal,
    arrivalTerminal,
  } = req.body;
  try {
    const f = new Flight({
      flightNumber: flightNumber,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      economySeats: +economySeats,
      businessSeats: +businessSeats,
      departureTerminal: departureTerminal,
      arrivalTerminal: arrivalTerminal,
    });
    const result = await f.save();
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err });
  }
};

exports.view = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ status: "success", data: flights });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err });
  }
};
