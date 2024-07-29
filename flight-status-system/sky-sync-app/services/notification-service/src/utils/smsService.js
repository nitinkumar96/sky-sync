// const twilio = require('twilio');

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSMS = async (to, body) => {
//   try {
//     await client.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//       body,
//     });
//     console.log(`SMS sent to ${to}`);
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// };

// module.exports = sendSMS;