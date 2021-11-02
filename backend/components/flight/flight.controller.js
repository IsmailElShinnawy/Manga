const Flight =require('./flight.model');
const config = require('../../config/auth.config');


 const createFlight= async (req, res)=>{
  
          const newFlight={
              flightNumber: "12",
          departureTime: new Date('August 19, 1975 23:15:30'),  //'YYYY/MM/DD HH:mm:ss'
          arrivalTime: new Date('August 19, 1975 23:15:30'),
          economySeats: 2,
          businessSeats: 2,
          airport: "airportt"
          }
  
      
      await Flight.create(newFlight);
      
      const test= await Flight.find();
      res.send(test);
     
  }
const allFlights= async(req,res)=>{

   const test= await Flight.find();
   res.send(test);
}
const deleteFlight= async(req,res)=>{
   var toBeDeleted=req.body.flights;
          for ( var i of toBeDeleted){
            try{
        //    var indexDeleted=toBeDeleted[i];
              await Flight.findByIdAndDelete({_id:i});
       //       console.log("test");
              
             // res.json({ status: 'success', message: 'flight deleted successfully' });
            }
            catch (err) {
              res.status(500).json({ status: 'fail', message: err });
              console.log(err);
            }
   }
   res.status(200).json({ status: 'Success', message: "Flight(s) deleted successfully" });
   //res.json({ status: 'success', message: 'flight(s) deleted successfully' });
 

}


module.exports = {
 deleteFlight, createFlight  };
  
