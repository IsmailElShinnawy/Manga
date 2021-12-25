const nodemailer = require('nodemailer');

const moment = require('moment');

const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: 'ismailelshennawy@test.com',
  subject: 'Node Mailer',
  text: 'Hello som3a! this is manga flights',
};

const sendTestEmail = async () => {
  try {
    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
      debug: true,
    });
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw err;
  }
};
const emailItinerary = async (
  to,
  recipientName,
  reservationId,
  dep_arrivalTerminal,
  dep_arrivalTime,
  dep_departureTerminal,
  dep_departureTime,
  dep_flightNumber,
  dep_price,
  dep_baggageAllowance,
  departureFlightCabin,
  departureFlightSeats,
  ret_arrivalTerminal,
  ret_arrivalTime,
  ret_departureTerminal,
  ret_departureTime,
  ret_flightNumber,
  ret_price,
  ret_baggageAllowance,
  returnFlightCabin,
  returnFlightSeats,
  total_amount
) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const getSeatsString = (cabin, seats = []) => {
    return seats.reduce(
      (prevValue, currentValue) =>
        prevValue +
        '' +
        (cabin === 'economy' ? `E${currentValue};` : `B${currentValue};`),
      ''
    );
  };

  const text = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Itinerary of reserved flight',
    html: `
      <h1>Hello ${recipientName} </h1>
      <p>Thank you for choosing Manga Flights</p>
      <p>Your reservation confirmation number is #${reservationId.toUpperCase()}</p>
      <h2>Flights' details</h2>
      <h3>Departure flight</h3>
      <p>${dep_flightNumber}</p>
      <p>${dep_departureTerminal} to ${dep_arrivalTerminal}</p>
      <p>Departs on ${moment(dep_departureTime).format('DD MMM YYYY hh:mm A')}<p>
      <p>Arrives on ${moment(dep_arrivalTime).format('DD MMM YYYY hh:mm A')}<p>
      <p>Chosen Seats in ${departureFlightCabin} class: (${getSeatsString(
      departureFlightCabin,
      departureFlightSeats
    )})</p>
    <h3>Return flight</h3>
      <p>${ret_flightNumber}</p>
      <p>${ret_departureTerminal} to ${ret_arrivalTerminal}</p>
      <p>Departs on ${moment(ret_departureTime).format('DD MMM YYYY hh:mm A')}<p>
      <p>Arrives on ${moment(ret_arrivalTime).format('DD MMM YYYY hh:mm A')}<p>
      <p>Chosen Seats in ${returnFlightCabin} class: (${getSeatsString(
      returnFlightCabin,
      returnFlightSeats
    )})</p>
    <h3>Amount paid: $${total_amount}</p>

    <p>We wish you a safe flight!</p>
    <br />
    <p>Best regards,</p>
    <p>Manga Flights Team</p>
    `,
  };
  try {
    const info1 = await transport.sendMail(text);
    return info1;
  } catch (err) {
    throw err;
  }
};

const sendCancelReservationMail = async (
  to,
  recipientName,
  reservationId,
  amountToRefund
) => {
  var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const options = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Reservation Cancelling and Refund',
    html: `<h1>Hello ${recipientName}</h1>
      <p>We are very sad to hear you decided to cancel your reservation (#${reservationId.toUpperCase()}).</p>
      <p>Luckly you will be refunded the full amount of USD ${amountToRefund}.</p>
      <br />
      <p>Best regards,</p>
      <p>Manga Flights Team</p>
    `,
  };
  try {
    const info = await transport.sendMail(options);
    return info;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  sendTestEmail,
  sendCancelReservationMail,
  emailItinerary,
};
