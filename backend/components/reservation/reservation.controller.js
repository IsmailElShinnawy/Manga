const Reservation = require('./reservation.model');
const Flight = require('../flight/flight.model');
const { sendCancelReservationMail, emailMyself } = require('../../service/mail');
const uuid = require('uuid');

// stripe
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.updateReservedFlight = async (req, res) => {
  try {
    let reservation = await Reservation.findById(req.params.id);
    if (reservation.account != req.accountId) {
      return res.status(401).send({ message: 'unauthorized' });
    }
    const { type, flightId, flightSeats, flightCabin } = req.body;
    const reservedFlightId =
      type == 'departure' ? reservation.departureFlight : reservation.returnFlight;
    const reservedFlightCabin =
      type == 'departure'
        ? reservation.departureFlightCabin
        : reservation.returnFlightCabin;
    const reservedSeats =
      type == 'departure'
        ? reservation.departureFlightSeats
        : reservation.returnFlightSeats;
    let reservedFlight = await Flight.findById(reservedFlightId);
    let flightToBeReserved = await Flight.findById(flightId);
    if (reservedFlight._id.equals(flightToBeReserved._id)) {
      return res.status(400).json({
        status: 'fail',
        message:
          'Cannot change seats of reserved flight through this feature, please use the change seats feature in the future',
      });
    }
    let allFlightSeats;
    if (flightCabin == 'economy') {
      allFlightSeats = flightToBeReserved.allEconomySeats;
    } else {
      allFlightSeats = flightToBeReserved.allBusinessSeats;
    }
    for (let i = 0; i < flightSeats.length; i++) {
      if (!allFlightSeats[flightSeats[i]]) {
        return res.status(400).json({
          status: 'fail',
          message: ` seat ${flightSeats[i]} in ${flightCabin} cabin is not available`,
        });
      }
    }
    reservedSeats.forEach(seat => {
      if (reservedFlightCabin == 'economy') {
        reservedFlight.allEconomySeats[+seat] = true;
      } else {
        reservedFlight.allBusinessSeats[+seat] = true;
      }
    });
    flightSeats.forEach(seat => {
      if (flightCabin == 'economy') {
        flightToBeReserved.allEconomySeats[+seat] = false;
      } else {
        flightToBeReserved.allBusinessSeats[+seat] = false;
      }
    });
    if (type == 'departure') {
      reservation.departureFlight = flightId;
      reservation.departureFlightCabin = flightCabin;
      reservation.departureFlightSeats = flightSeats;
    } else {
      reservation.returnFlight = flightId;
      reservation.returnFlightCabin = flightCabin;
      reservation.returnFlightSeats = flightSeats;
    }
    await Flight.findByIdAndUpdate(reservedFlight._id, reservedFlight);
    await Flight.findByIdAndUpdate(flightToBeReserved._id, flightToBeReserved);
    await Reservation.findByIdAndUpdate(reservation._id, reservation);
    return res.status(204).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'fail', message: err });
  }
};

exports.updateSeats = async (req, res) => {
  const { id } = req.params;
  try {
    let reservation = await Reservation.findById(id);
    if (reservation.account != req.accountId) {
      return res.status(401).send({ message: 'unauthorized' });
    }
    const { type, seats } = req.body;
    const flightId =
      type == 'departure' ? reservation.departureFlight : reservation.returnFlight;
    const flightCabin =
      type == 'departure'
        ? reservation.departureFlightCabin
        : reservation.returnFlightCabin;
    let flight = await Flight.findById(flightId);
    const allFlightSeats =
      flightCabin == 'economy' ? flight.allEconomySeats : flight.allBusinessSeats;
    const reservedSeats =
      type == 'departure'
        ? reservation.departureFlightSeats
        : reservation.returnFlightSeats;
    if (seats.length != reservedSeats.length) {
      return res.status(401).json({
        status: 'fail',
        message: "old seats number and new seats number don't match",
      });
    }
    for (let i = 0; i < seats.length; i++) {
      let seat = seats[i];
      if (!allFlightSeats[Number(seat)] && !reservedSeats.includes(seat)) {
        return res.status(400).json({
          status: 'fail',
          message: `seat ${seat} in ${flightCabin} cabin is not available`,
        });
      }
    }
    reservedSeats.forEach(seat => {
      if (flightCabin == 'economy') {
        flight.allEconomySeats[Number(seat)] = true;
      } else {
        flight.allBusinessSeats[Number(seat)] = true;
      }
    });
    seats.forEach(seat => {
      if (flightCabin == 'economy') {
        flight.allEconomySeats[Number(seat)] = false;
      } else {
        flight.allBusinessSeats[Number(seat)] = false;
      }
    });
    if (type == 'departure') {
      reservation.departureFlightSeats = seats;
    } else {
      reservation.returnFlightSeats = seats;
    }
    await Reservation.findByIdAndUpdate(reservation._id, reservation);
    await Flight.findByIdAndUpdate(flight._id, flight);
    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'fail', message: err });
  }
};

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
      reservation.departureFlightCabin,
      reservation.departureFlightSeats,
      ret_arrivalTerminal,
      ret_arrivalTime,
      ret_departureTerminal,
      ret_departureTime,
      ret_flightNumber,
      ret_price,
      ret_baggageAllowance,
      reservation.returnFlightCabin,
      reservation.returnFlightSeats,
      total_amount
    );

    return res.status(200).json({ status: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'fail', message: err });
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
      res.status(400).json({
        status: 'fail',
        message: 'Cabin should be either economy or business',
      });
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
      res.status(400).json({
        status: 'fail',
        message: 'Cabin should be either economy or business',
      });
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

exports.getClientSecretForFullReservation = async (req, res) => {
  const {
    departureFlightId,
    returnFlightId,
    departureFlightPassengers,
    returnFlightPassengers,
  } = req.body;

  const { ticketPrice: departureFlightTicketPrice } = await Flight.findById(
    departureFlightId
  );
  const { ticketPrice: returnFlightTicketPrice } = await Flight.findById(returnFlightId);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount:
        departureFlightTicketPrice * departureFlightPassengers * 100 +
        returnFlightTicketPrice * returnFlightPassengers * 100,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    return res.json({ data: { clientSecret: paymentIntent.client_secret } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
