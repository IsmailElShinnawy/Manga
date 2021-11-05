const Flight = require('./flight.model');
const moment = require('moment');

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
    criteria.push({
      $or: [
        { flightNumber: { $regex: new RegExp(term.trim()) } },
        { arrivalTerminal: { $regex: new RegExp(term.trim()) } },
        { departureTerminal: { $regex: new RegExp(term.trim()) } },
      ],
    });
  }
  if (fromArrivalDate) {
    const startDate = moment(fromArrivalDate).toDate();
    criteria.push({ arrivalTime: { $gte: startDate } });
  }
  if (toArrivalDate) {
    const endDate = moment(toArrivalDate).add(1, 'days').toDate();
    criteria.push({ arrivalTime: { $lt: endDate } });
  }
  if (fromDepartureDate) {
    const startDate = moment(fromDepartureDate).toDate();
    criteria.push({ departureTime: { $gte: startDate } });
  }
  if (toDepartureDate) {
    const endDate = moment(toDepartureDate).add(1, 'days').toDate();
    criteria.push({ departureTime: { $lt: endDate } });
  }
  try {
    const flights = await Flight.find(criteria.length > 0 ? { $and: [...criteria] } : {});
    res.status(200).json({ status: 'success', data: flights });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};
