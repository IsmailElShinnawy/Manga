const { getFlightSeatInfo } = require('../flight/flight.controller');
const flightModel = require('../flight/flight.model');
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
  exports.cancelReservations = async (req, res) => {

    var toBeCancelled = req.body.reservations;
    for (var i of toBeCancelled) {
    
       
     try { 
        await Flight.deleteOne({ _id: i });
        const reservationss = await Reservation.findById(req.params.id);
        const departureflight = await Flight.findById(reservationss._id);
        const returnflight = await Flight.findById(reservationss._id);
        for (let i = 0; i < departureFlightSeats.length; i++){
        if (reservationss.departureFlightCabin == 'Business') {
            departureflight.allBusinessSeats[reservationss[i]-1]==true;
        }  
        if(reservationss.departureFlightCabin == 'Economy'){
            departureflight.allEconmySeats[reservationss[i]-1]==true;
        }}
        for (let j = 0; j < returnFlightSeats.length; j++){
        if (reservationss.returnFlightCabin == 'Business') {
            returnflight.allBusinessSeats[reservationss[j]-1]==true;
            
        } 
        if(reservationss.returnFlightCabin == 'Economy'){
            returnflight.allEconmySeats[reservationss[j]-1]==true;
        }
    }
}
      catch (err) {
        res.status(500).json({ status: 'fail', message: err });
        console.log(err);}
      }
      res.status(200).json({ status: 'Success', data: null });

    
  };