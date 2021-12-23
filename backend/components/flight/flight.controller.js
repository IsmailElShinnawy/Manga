const Flight = require('./flight.model');
const moment = require('moment');
const Reservation = require('../reservation/reservation.model');

exports.getAlternative = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
    if (req.accountId != reservation.account) {
      return res.status(401).send({ message: 'unauthorized' });
    }
    const { type } = req.body;
    const flightToMatchId =
      type === 'departure' ? reservation.returnFlight : reservation.departureFlight;
    const flightToMatch = await Flight.findById(flightToMatchId);
    const criteria = {
      departureTerminal: flightToMatch.arrivalTerminal,
      arrivalTerminal: flightToMatch.departureTerminal,
      _id: {
        $ne:
          type === 'departure' ? reservation.departureFlight : reservation.returnFlight,
      },
    };
    if (type === 'departure') {
      criteria.arrivalTime = { $lt: flightToMatch.departureTime };
    } else {
      criteria.departureTime = { $gt: flightToMatch.arrivalTime };
    }
    const result = await Flight.find(criteria);
    const checkSeats = (numberOfSeats, arr = []) => {
      return arr.reduce((_, current) => (current ? 1 : 0), 0) >= numberOfSeats;
    };
    const flightCabin =
      type == 'departure'
        ? reservation.departureFlightCabin
        : reservation.returnFlightCabin;
    const numberOfReservedSeats =
      type == 'departure'
        ? reservation.departureFlightSeats.length
        : reservation.returnFlightSeats.length;
    const filteredResult = result.filter(flight =>
      checkSeats(
        numberOfReservedSeats,
        flightCabin == 'economy' ? flight.allEconomySeats : flight.allBusinessSeats
      )
    );
    return res.status(200).json({ status: 'success', data: filteredResult });
  } catch (err) {
    return res.status(200).json({ status: 'success', message: err });
  }
};

exports.returnFlights = async (req, res) => {
  const { cabinClass, numberOfPassengers = 0 } = req.body;
  try {
    const departureFlight = await Flight.findById(req.params.id);
    let returnFlight = 0;
    if (cabinClass == 'business') {
      returnFlight = await Flight.find({
        departureTerminal: departureFlight.arrivalTerminal,
        arrivalTerminal: departureFlight.departureTerminal,
        departureTime: { $gte: departureFlight.arrivalTime },
        businessSeats: { $gte: numberOfPassengers },
      });
    } else {
      if (cabinClass == 'economy') {
        returnFlight = await Flight.find({
          departureTerminal: departureFlight.arrivalTerminal,
          arrivalTerminal: departureFlight.departureTerminal,
          departureTime: { $gte: departureFlight.arrivalTime },
          economySeats: { $gte: numberOfPassengers },
        });
      } else {
        returnFlight = await Flight.find({
          departureTerminal: departureFlight.arrivalTerminal,
          arrivalTerminal: departureFlight.departureTerminal,
          departureTime: { $gte: departureFlight.arrivalTime },
          $or: [
            { businessSeats: { $gte: numberOfPassengers } },
            { economySeats: { $gte: numberOfPassengers } },
          ],
        });
      }
    }
    res.status(200).json({ status: 'success', data: returnFlight });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.updateFlight = async (req, res) => {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    economySeats,
    businessSeats,
    departureTerminal,
    arrivalTerminal,
    tripDuration,
    ticketPrice,
    baggageAllowance,
  } = req.body;
  try {
    const oldFlightData = await Flight.findById(req.params.id);
    const updatedFlightData = {
      flightNumber: flightNumber || oldFlightData.flightNumber,
      departureTime: new Date(departureTime) || oldFlightData.departureTime,
      arrivalTime: new Date(arrivalTime) || oldFlightData.arrivalTime,
      economySeats: +economySeats || oldFlightData.economySeats,
      businessSeats: +businessSeats || oldFlightData.businessSeats,
      departureTerminal: departureTerminal || oldFlightData.depratureTerminal,
      arrivalTerminal: arrivalTerminal || oldFlightData.arrivalTerminal,
      tripDuration: tripDuration || oldFlightData.tripDuration,
      ticketPrice: ticketPrice || oldFlightData.ticketPrice,
      baggageAllowance: baggageAllowance || oldFlightData.baggageAllowance,
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
    ticketPrice,
    baggageAllowance,
  } = req.body;
  try {
    const f = new Flight({
      flightNumber: flightNumber,
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      economySeats: +economySeats,
      businessSeats: +businessSeats,
      allEconomySeats: new Array(+economySeats).fill(true),
      allBusinessSeats: new Array(+businessSeats).fill(true),
      departureTerminal: departureTerminal,
      arrivalTerminal,
      ticketPrice: +ticketPrice,
      baggageAllowance: +baggageAllowance,
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
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.userSearchFlights = async (req, res) => {
  const {
    passengers,
    departureTerminal,
    arrivalTerminal,
    departureDate,
    arrivalDate,
    cabinClass,
  } = req.body;
  try {
    const criteria = [];
    if (passengers) {
      const seats = cabinClass === 'economy' ? 'economySeats' : 'businessSeats';
      criteria.push({ [seats]: { $gte: passengers < 0 ? 0 : passengers } });
    }
    if (departureTerminal) {
      criteria.push({ departureTerminal });
    }
    if (arrivalTerminal) {
      criteria.push({ arrivalTerminal });
    }
    if (departureDate) {
      const minDepartureTime = moment(departureDate);
      const maxDepartureTime = moment(departureDate).add(1, 'days');
      criteria.push({
        departureTime: {
          $gte: minDepartureTime.toDate(),
          $lt: maxDepartureTime.toDate(),
        },
      });
    }
    if (arrivalDate) {
      const minArrivalTime = moment(arrivalDate);
      const maxArrivalTime = moment(arrivalDate).add(1, 'days');
      criteria.push({
        arrivalTime: {
          $gte: minArrivalTime.toDate(),
          $lt: maxArrivalTime.toDate(),
        },
      });
    }
    const flights = await Flight.find(criteria.length > 0 ? { $and: [...criteria] } : {});
    res.status(200).json({ status: 'success', data: flights });
  } catch (err) {
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
    }
  }
  res.status(200).json({ status: 'Success', data: null });
};

exports.viewFlight = async (req, res) => {
  try {
    var flight = await Flight.findById(req.params.id);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
  res.status(200).json({ status: 'Success', data: flight });
};

exports.getFlightSeatInfo = async (req, res) => {
  const { cabin } = req.body;
  try {
    const flight = await Flight.findById(req.params.id);
    let seatInfo = [];
    if (cabin === 'business') {
      seatInfo = flight.allBusinessSeats;
    } else if (cabin === 'economy') {
      seatInfo = flight.allEconomySeats;
    }
    res.status(200).json({ status: 'success', data: seatInfo });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};
