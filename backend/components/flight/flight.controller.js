const Flight = require('./flight.model');
const { businessCabinClass, economyCabinClass } = require('../../config/flight.config');
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
    tripDuration, 
    price, 
    baggageAllowance
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
      price: price || oldFlightData.price,
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
    tripDuration, 
    price, 
    baggageAllowance
  } = req.body;
  try {
    const f = new Flight({
      flightNumber: flightNumber,
      departureTime: new Date(departureTime),
      arrivalTime: new Date(arrivalTime),
      economySeats: +economySeats,
      businessSeats: +businessSeats,
      departureTerminal: departureTerminal,
      arrivalTerminal: arrivalTerminal,
      tripDuration: tripDuration,
      price: price,
      baggageAllowance: baggageAllowance,
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
    const minDepartureTime = moment(departureDate, 'YYYY-MM-DD');
    const maxDepartureTime = moment(departureDate, 'YYYY-MM-DD').add(1, 'days');
    const minArrivalTime = moment(arrivalDate, 'YYYY-MM-DD');
    const maxArrivalTime = moment(arrivalDate, 'YYYY-MM-DD').add(1, 'days');
    const seats = cabinClass === economyCabinClass ? 'economySeats' : 'businessSeats';
    const flights = await Flight.find({
      departureTerminal,
      arrivalTerminal,
      departureTime: {
        $gte: minDepartureTime.toDate(),
        $lt: maxDepartureTime.toDate(),
      },
      arrivalTime: { $gte: minArrivalTime.toDate(), $lt: maxArrivalTime.toDate() },
      [seats]: { $gte: passengers < 0 ? 0 : passengers },
    });
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
      console.log(err);
    }
  }
  res.status(200).json({ status: 'Success', data: null });
};

exports.viewFlight=async (req,res)=>{
  try{
  var flight= await Flight.findById(req.params.id);
  }
  catch (err){
    res.status(500).json({ status: 'fail', message: err });
     console.log(err);
  }
  res.status(200).json({ status: 'Success', data: flight });

}



exports.getFlightSeatInfo = async (req, res) => {
  const { cabin } = req.body;
  try {
    const flight = await Flight.findById(req.params.id);
    let seatInfo = 0;
    if (cabin == 'Business') {
      seatInfo = flight.allBusinessSeats;
    } else {
      seatInfo == flight.allEconomySeats;
    }
    console.log(flight);
    res.status(200).json({ status: 'success', data: seatInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};
