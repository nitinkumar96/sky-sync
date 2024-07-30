const { logNotification } = require('./notificationLog');
//const twilio = require('twilio');

//const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
    logNotification('SMS', to, message);
//   try {
//     await client.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//       message,
//     });
//     console.log(`SMS sent to ${to}`);
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }

};

module.exports = sendSMS;