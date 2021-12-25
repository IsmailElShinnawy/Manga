const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Role = require('./components/role/role.model');
const Account = require('./components/account/account.model');
const authRouter = require('./components/auth/auth.routes');
const accountRouter = require('./components/account/account.routes');
const flightRouter = require('./components/flight/flight.routes');
const reservationRouter = require('./components/reservation/reservation.routes');

const { sendTestEmail } = require('./service/mail');

var corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
};

const MongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mmmpx.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/account', accountRouter);
app.use('/flight', flightRouter);
app.use('/reservation', reservationRouter);

// simple route to test email
app.get('/testmail', async (req, res) => {
  try {
    const info = await sendTestEmail();
    console.log(info);
    return res.json(info);
  } catch (err) {
    console.log(err);
    return res.send(500);
  }
});

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

  try {
    const adminRoleId = (await Role.findOne({ name: 'admin' }))._id;
    const adminAccount = await Account.findOne({
      email: `${process.env.ADMIN_EMAIL}`,
      username: 'admin',
    });

    if (!adminAccount) {
      const admin = new Account({
        email: `${process.env.ADMIN_EMAIL}`,
        username: 'admin',
        password: bcrypt.hashSync(`${process.env.ADMIN_PASSWORD}`, 8),
        roles: [adminRoleId],
      });

      await admin.save();
    }
  } catch (err) {
    console.log(err);
  }
};
