const { find } = require('./reservation.model');
const Reservation = require('./reservation.model');
exports.viewReservations = async (req, res) => {
    try {
      var reservations = await Reservation.find({account : req.accountId});
      res.status(200).json({ status: 'success', data: reservations});
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err });
    }
  };