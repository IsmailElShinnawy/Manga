const Flight = require('./flight.model');

exports.create = async (req, res) => {
  const f = new Flight({
    flightNumber: req.body.flightNumber,
    departureTime: req.body.departureTime,
    arrivalTime: req.body.arrivalTime,
    economySeats: req.body.economySeats,
    businessSeats: req.body.businessSeats,
    airport: req.body.airport,
  });
  const result = await f.save();
  res.send(result);
};

exports.view = (req, res) => {
  res.status(200).send('view Content.');
};
