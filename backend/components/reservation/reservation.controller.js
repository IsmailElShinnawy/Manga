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
         try {
        const reservationss = await Reservation.findById(req.params.id);
        const departureflights = await flightModel.findById(Reservation.departureFlight);
        const returnflightss = await flightModel.findById(Reservation.returnFlight);
        for (let i = 0; i < departureFlightSeats.length; i++){
        if (reservationss.departureFlightCabin == 'Business') {
            departureflights.allBusinessSeats[reservationss[i]-1]==true;
        }  
        if(reservationss.departureFlightCabin == 'Economy'){
            departureflights.allEconmySeats[reservationss[i]-1]==true;
        }}
        for (let j = 0; j < returnFlightSeats.length; j++){
        if (reservationss.returnFlightCabin == 'Business') {
            returnflightss.allBusinessSeats[reservationss[j]-1]==true;
            
        } 
        if(reservationss.returnFlightCabin == 'Economy'){
            returnflightss.allEconmySeats[reservationss[j]-1]==true;
        }
    }
    const result = await flightModel.findByIdAndUpdate(
        {_id:reservationss.departureFlight},
        
        {allBusinessSeats:departureflights.allBusinessSeats,
        allEconmySeats:departureflights.allEconmySeats} ,
        {
            returnDocument : 'after',
    
        }
    )
    const results = await flightModel.findByIdAndUpdate(
        {_id:reservationss.returnFlight},
    
        {allBusinessSeats:returnflightss.allBusinessSeats,
        allEconmySeats:returnflightss.allEconmySeats} ,
        {
            returnDocument : 'after',
    
        }
    )
}
      catch (err) {
        res.status(500).json({ status: 'fail', message: err });
        console.log(err);}
    
      res.status(200).json({ status: 'Success', data: null });

    
  };