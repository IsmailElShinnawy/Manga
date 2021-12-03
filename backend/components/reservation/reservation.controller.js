const Reservation = require('./reservation.model');
const Flight = require('../flight/flight.model');

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      account: req.accountId,
    });
    res.status(200).json({ status: 'success', data: reservations });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err });
  }
};

exports.cancelReservation = async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id)
      .populate('departureFlight')
      .populate('returnFlight')
      .exec();
    if (reservation && reservation.account.toString() !== req.accountId) {
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
