const Flight = require('./flight.model');

exports.create = async (req, res) => {
  try {
    const f = new Flight({
      flightNumber: req.body.flightNumber,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      economySeats: req.body.economySeats,
      businessSeats: req.body.businessSeats,
      airport: req.body.airport,
    });
    const result = await f.save();
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.view = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({ status: 'success', data: flights });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};
