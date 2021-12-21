const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  // service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: 'ismailelshennawy@gmail.com',
  subject: 'Node Mailer',
  text: 'Hello som3a! this is manga flights',
};

const sendTestEmail = async () => {
  try {
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw err;
  }
};
const emailMyself = async (
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
  ret_arrivalTerminal,
  ret_arrivalTime,
  ret_departureTerminal,
  ret_departureTime,
  ret_flightNumber,
  ret_price,
  ret_baggageAllowance,
  total_amount,



) => {
  console.log(to, recipientName, reservationId, departureFlight, returnFlight);
  const text = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Itinerary of reserved flight',
    html: `<h1>Hello ${recipientName}</h1>
      <p>Reservation ID: ${reservationId.toUpperCase()}.</p>
      <h1>Departure Flight Details</h1>
      <p>Departure Flight Number: ${dep_flightNumber}.</p>
      <p>Departure Flight's Departure Terminal: ${dep_departureTerminal}.</p>
      <p>Departure Flight's Departure Time: ${dep_departureTime}.</p>
      <p>Departure Flight's Arrival Terminal: ${dep_arrivalTerminal}.</p>
      <p>Departure Flight's Arrival Time: ${dep_arrivalTime}.</p>
      <p>Departure Flight's ticket Price: ${dep_price} EGP.</p>
      <p>Departure Flight's baggage allowance: ${dep_baggageAllowance} KG.</p>
      <h1>Return Flight Details</h1>
      <p>Return Flight Number: ${ret_flightNumber}.</p>
      <p>Return Flight's Departure Terminal: ${ret_departureTerminal}.</p>
      <p>Return Flight's Departure Time: ${ret_departureTime}.</p>
      <p>Return Flight's Arrival Terminal: ${ret_arrivalTerminal}.</p>
      <p>Return Flight's Arrival Time: ${ret_arrivalTime}.</p>
      <p>Return Flight's ticket Price: ${ret_price} EGP.</p>
      <p>Return Flight's baggage allowance: ${ret_baggageAllowance} Kg.</p>
      <h1>Amount to be paid: ${total_amount} EGP</h1>






      <p>Return Flight: ${returnFlight}.</p>
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
  console.log(to, recipientName, reservationId, amountToRefund);
  const options = {
    from: process.env.FROM_EMAIL,
    to,
    subject: 'Reservation Cancelling and Refund',
    html: `<h1>Hello ${recipientName}</h1>
      <p>We are very sad to hear you decided to cancel your reservation (#${reservationId.toUpperCase()}).</p>
      <p>Luckly you will be refunded the full amount of EGP ${amountToRefund}.</p>
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
  emailMyself,
};
