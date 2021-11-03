const Flight = require('./flight.model');

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

exports.searchFlights = async (req, res) => {
  const { term } = req.query;
  const {
    fromArrivalDate,
    toArrivalDate,
    fromDepartureDate,
    toDepartureDate,
    fromArrivalTime,
    toArrivalTime,
    fromDepartureTime,
    toDepartureTime,
  } = req.body;
  const criteria = [];
  if (term.trim().length > 0) {
    criteria.push({ $text: { $search: term.trim() } });
  }
  if (fromArrivalDate) {
    const startDate = new Date(`${fromArrivalDate}T00:00:00.000Z`);
    criteria.push({ arrivalTime: { $gte: new Date(startDate) } });
  }
  if (toArrivalDate) {
    const endDate = new Date(`${toArrivalDate}T23:59:59.000Z`);
    criteria.push({ arrivalTime: { $lt: new Date(endDate) } });
  }
  if (fromDepartureDate) {
    const startDate = new Date(`${fromDepartureDate}T00:00:00.000Z`);
    criteria.push({ departureTime: { $gte: new Date(startDate) } });
  }
  if (toDepartureDate) {
    const endDate = new Date(`${toDepartureDate}T23:59:59.000Z`);
    criteria.push({ departureTime: { $lt: new Date(endDate) } });
  }
  try {
    const flights = await Flight.find(criteria.length > 0 ? { $and: [...criteria] } : {});
    res.status(200).json({ status: 'success', data: flights });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};
