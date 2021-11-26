const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
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

module.exports = {
  sendTestEmail,
};
