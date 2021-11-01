const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Role = require('./components/role/role.model');
const Account = require('./components/account/account.model');
const authRouter = require('./components/auth/auth.routes');
const accountRouter = require('./components/account/account.routes');
const flightModel = require('./components/flight/flight.model');
const { listIndexes } = require('./components/role/role.model');

var corsOptions = {
  origin: 'http://localhost:8081',
};

const MongoURI =
  'mongodb+srv://mangaAdmin:mangaAdmin111@cluster0.mmmpx.mongodb.net/MangaFlightsDB?retryWrites=true&w=majority';

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/account', accountRouter);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ACL project.' });
});

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log('Connected to MongoDB!');
    initial();
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const initial = async () => {
  try {
    const rolesCount = await Role.estimatedDocumentCount();
    if (rolesCount === 0) {
      const userRole = new Role({
        name: 'user',
      });

      await userRole.save();

      const adminRole = new Role({
        name: 'admin',
      });

      await adminRole.save();
    }
  } catch (err) {
    console.log(err);
  }
}

  try {
    const adminRoleId = (await Role.findOne({ name: 'admin' }))._id;
    const adminAccount = await Account.findOne({
      email: 'admin@mangaflights.com',
      username: 'admin',
    });

    if (!adminAccount) {
      const admin = new Account({
        email: 'admin@mangaflights.com',
        username: 'admin',
        password: bcrypt.hashSync('mangaAdmin111', 8),
        roles: [adminRoleId],
      });

      await admin.save();
    }
  } catch (err) {
    console.log(err);
  } 
  
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
        