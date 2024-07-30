const nodemailer = require('nodemailer');
require('dotenv').config();
const { logNotification } = require('./notificationLog');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alanna.stark28@ethereal.email',
        pass: 'CuvBgYrtUynx3cGHX5'
    }
});

const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    logNotification('Email', to, `${subject} - ${message}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
