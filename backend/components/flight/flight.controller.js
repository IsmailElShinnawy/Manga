const Flight = require('./flight.model');
const moment = require('moment');

exports.updateFlight = async (req, res) => {
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
    const oldFlightData = await Flight.findById(req.params.id);
    const updatedFlightData = {
      flightNumber: flightNumber || oldFlightData.flightNumber,
      departureTime: departureTime || oldFlightData.departureTime,
      arrivalTime: arrivalTime || oldFlightData.arrivalTime,
      economySeats: +economySeats || oldFlightData.economySeats,
      businessSeats: +businessSeats || oldFlightData.businessSeats,
      departureTerminal: departureTerminal || oldFlightData.depratureTerminal,
      arrivalTerminal: arrivalTerminal || oldFlightData.arrivalTerminal,
    };
    const result = await Flight.findByIdAndUpdate(
      { _id: req.params.id },
      updatedFlightData,
      {
        returnDocument: 'after',
      }
    );
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
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
    const extractedDate = moment(fromArrivalDate).format('YYYY-MM-DD');
    const startDate = moment(
      `${extractedDate} ${fromArrivalTime ? fromArrivalTime : ''}`,
      'YYYY-MM-DD hh:mm'
    ).toDate();
    criteria.push({ arrivalTime: { $gte: startDate } });
  }
  if (toArrivalDate) {
    const extractedDate = moment(toArrivalDate).format('YYYY-MM-DD');
    const endDate = moment(
      `${extractedDate} ${toArrivalTime ? toArrivalTime : ''}`,
      'YYYY-MM-DD hh:mm'
    )
      .add(toArrivalTime ? 0 : 1, 'days')
      .toDate();
    criteria.push({ arrivalTime: { $lt: endDate } });
  }
  if (fromDepartureDate) {
    const extractedDate = moment(fromDepartureDate).format('YYYY-MM-DD');
    const startDate = moment(
      `${extractedDate} ${fromDepartureTime ? fromDepartureTime : ''}`,
      'YYYY-MM-DD hh:mm'
    ).toDate();
    criteria.push({ departureTime: { $gte: startDate } });
  }
  if (toDepartureDate) {
    const extractedDate = moment(toDepartureDate).format('YYYY-MM-DD');
    const endDate = moment(
      `${extractedDate} ${toDepartureTime ? toDepartureTime : ''}`,
      'YYYY-MM-DD hh:mm'
    )
      .add(toDepartureTime ? 0 : 1, 'days')
      .toDate();
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

exports.deleteFlight = async (req, res) => {
  var toBeDeleted = req.body.flights;
  for (var i of toBeDeleted) {
    try {
      await Flight.deleteOne({ _id: i });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err });
      console.log(err);
    }
  }
  res.status(200).json({ status: 'Success', data: null });
};
