const nodemailer = require('nodemailer');

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
  console.log(to, recipientName, reservationId, amountToRefund);
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
};
