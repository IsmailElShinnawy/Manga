const Flight = require('./flight.model');
exports.view = async (req,res)=> {
    Flight.find().then((result)=> {
      res.send(result); 
    }).catch((err)=>{
      console.log(err);
    })
  };
 