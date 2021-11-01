exports.create = (req, res) => {
    res.status(200).send('create flight Content.');
  };
  
  exports.view = (req, res) => {
    res.status(200).send('view Content.');
  };
  app.post("/createflight",async(req,res)=> {
    const f = new flight
    ({
      flightNumber: req.body.flightNumber,
      departureTime : req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      economySeats: req.body.economySeats,
      businessSeats: req.body.businessSeats,
      airport: req.body.airport
    });
     const result =await f.save() 
        res.send(result);
      });
      