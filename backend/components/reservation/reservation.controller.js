const Reservation = require('./reservation.model');
const Flight = require('../flight/flight.model');
const { sendCancelReservationMail, emailMyself } = require('../../service/mail');

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      account: req.accountId,
    })
      .populate('departureFlight')
      .populate('returnFlight')
      .exec();
    res.status(200).json({ status: 'success', data: reservations });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};
exports.sendItineraryEmail = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id)
      .populate('account')
      .populate('departureFlight')
      .populate('returnFlight')
      .exec();
    if (reservation && reservation.account._id.toString() !== req.accountId) {
      res.status(403).json({ status: 'fail', message: 'Not Authorized' });
      return;
    }
    // const departureFlight = reservation.departureFlight;
    // const returnFlight = reservation.returnFlight;
    const recipientName = `${reservation.account.firstname} ${reservation.account.lastname}`;
    const to = reservation.account.email;
    // departure flight
    const dep_arrivalTerminal = reservation.departureFlight.arrivalTerminal;
    const dep_arrivalTime = reservation.departureFlight.arrivalTime;
    const dep_departureTerminal = reservation.departureFlight.departureTerminal;
    const dep_departureTime = reservation.departureFlight.departureTime;
    const dep_flightNumber = reservation.departureFlight.flightNumber;
    const dep_id = reservation.departureFlight._id;
    const dep_price = reservation.departureFlight.ticketPrice;
    const dep_baggageAllowance = reservation.departureFlight.baggageAllowance;

    // return flight
    const ret_arrivalTerminal = reservation.returnFlight.arrivalTerminal;
    const ret_arrivalTime = reservation.returnFlight.arrivalTime;
    const ret_departureTerminal = reservation.returnFlight.departureTerminal;
    const ret_departureTime = reservation.returnFlight.departureTime;
    const ret_flightNumber = reservation.returnFlight.flightNumber;
    const ret_id = reservation.returnFlight._id;
    const ret_price = reservation.returnFlight.ticketPrice;
    const ret_baggageAllowance = reservation.returnFlight.baggageAllowance;
    //
    const total_amount =
      reservation.returnFlight.ticketPrice * reservation.returnFlightSeats.length +
      reservation.departureFlight.ticketPrice * reservation.departureFlightSeats.length;
    await emailMyself(
      to,
      recipientName,
      id,
      dep_arrivalTerminal,
      dep_arrivalTime,
      dep_departureTerminal,
      dep_departureTime,
      dep_flightNumber,
      dep_price,
      dep_baggageAllowance,
      ret_arrivalTerminal,
      ret_arrivalTime,
      ret_departureTerminal,
      ret_departureTime,
      ret_flightNumber,
      ret_price,
      ret_baggageAllowance,
      total_amount
    );

    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.cancelReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id)
      .populate('account')
      .populate('departureFlight')
      .populate('returnFlight')
      .exec();
    if (reservation && reservation.account._id.toString() !== req.accountId) {
      res.status(403).json({ status: 'fail', message: 'Not Authorized' });
      return;
    }

    const departureSeats =
      reservation.departureFlightCabin === 'economy'
        ? 'allEconomySeats'
        : 'allBusinessSeats';

    const departureFlight = reservation.departureFlight;
    const allDepartureSeats = departureFlight[departureSeats];
    for (let i = 0; i < reservation.departureFlightSeats.length; ++i) {
      allDepartureSeats[reservation.departureFlightSeats[i]] = true;
    }

    await Flight.findByIdAndUpdate(reservation.departureFlight._id, {
      [departureSeats]: allDepartureSeats,
    });

    const returnSeats =
      reservation.returnFlightCabin === 'economy'
        ? 'allEconomySeats'
        : 'allBusinessSeats';

    const returnFlight = reservation.returnFlight;
    const allReturnSeats = returnFlight[returnSeats];
    for (let i = 0; i < reservation.returnFlightSeats.length; ++i) {
      allReturnSeats[reservation.returnFlightSeats[i]] = true;
    }

    await Flight.findByIdAndUpdate(reservation.returnFlight._id, {
      [returnSeats]: allReturnSeats,
    });

    await Reservation.findByIdAndDelete(id);

    const amountToRefund =
      reservation.departureFlight.ticketPrice * reservation.departureFlightSeats.length +
      reservation.returnFlight.ticketPrice * reservation.returnFlightSeats.length;

    const recipientName = `${reservation.account.firstname} ${reservation.account.lastname}`;
    const to = reservation.account.email;

    await sendCancelReservationMail(to, recipientName, id, amountToRefund);

    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.getReservation = async (req, res) => {
  const { id } = req.params;
  try {
    let reservation = await Reservation.findById(id)
      .populate('departureFlight')
      .populate('returnFlight')
      .exec();
    if (reservation && reservation.account.toString() !== req.accountId) {
      res.status(403).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }
    res.status(200).json({ status: 'success', data: reservation });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.createReservation = async (req, res) => {
  const {
    departureFlightId,
    returnFlightId,
    departureFlightSeats,
    returnFlightSeats,
    departureFlightCabin,
    returnFlightCabin,
  } = req.body;

  try {
    const departureFlight = await Flight.findById(departureFlightId);
    const departureSeats =
      departureFlightCabin === 'economy'
        ? 'allEconomySeats'
        : departureFlightCabin === 'business'
        ? 'allBusinessSeats'
        : null;

    if (!departureSeats) {
      res
        .status(400)
        .json({ status: 'fail', message: 'Cabin should be either economy or business' });
      return;
    }

    const allDepartureSeats = departureFlight[departureSeats];

    for (let i = 0; i < departureFlightSeats.length; ++i) {
      const seat = departureFlightSeats[i];
      if (!allDepartureSeats[+seat]) {
        res.status(400).json({
          status: 'fail',
          message: `Departure seat ${seat} in ${departureFlightCabin} cabin is not available`,
        });
        return;
      }
      allDepartureSeats[+seat] = false;
    }

    const returnFlight = await Flight.findById(returnFlightId);
    const returnSeats =
      returnFlightCabin === 'economy'
        ? 'allEconomySeats'
        : returnFlightCabin === 'business'
        ? 'allBusinessSeats'
        : null;

    if (!returnSeats) {
      res
        .status(400)
        .json({ status: 'fail', message: 'Cabin should be either economy or business' });
      return;
    }

    const allReturnSeats = returnFlight[returnSeats];

    for (let i = 0; i < returnFlightSeats.length; ++i) {
      const seat = returnFlightSeats[i];
      if (!allReturnSeats[+seat]) {
        res.status(400).json({
          status: 'fail',
          message: `Return seat ${seat} in ${returnFlightCabin} cabin is not available`,
        });
        return;
      }
      allReturnSeats[+seat] = false;
    }

    await Flight.findByIdAndUpdate(departureFlightId, {
      [departureSeats]: allDepartureSeats,
    });

    await Flight.findByIdAndUpdate(returnFlightId, {
      [returnSeats]: allReturnSeats,
    });

    const r = new Reservation({
      account: req.accountId,
      departureFlight: departureFlightId,
      returnFlight: returnFlightId,
      departureFlightSeats,
      returnFlightSeats,
      departureFlightCabin,
      returnFlightCabin,
    });

    const reservation = await r.save();

    res.status(200).json({ status: 'success', data: reservation });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};
