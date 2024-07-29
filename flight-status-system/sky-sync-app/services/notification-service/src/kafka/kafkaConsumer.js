const { Kafka } = require('kafkajs');
const sendEmail = require('../utils/emailService');
//const sendSMS = require('../utils/smsService');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'passenger_updates', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      const { flight, booking, passenger } = event.data;
      console.log(`\n\nSending notification to ${passenger.name} at ${passenger.mobile} about the change in their flight (${flight.flightNumber}) status with PNR: ${booking.pnr}`);

      const emailSubject = `Flight Update: ${flight.flightNumber}, ${flight.airline}`;
      const emailBody = `Dear ${passenger.name},\n\nThe status of your flight ${flight.flightNumber} with PNR: ${booking.pnr} has been updated.\n\nStatus: ${flight.status}\nDeparture Time: ${flight.departureTime}\nArrival Time: ${flight.arrivalTime}\nGate: ${flight.gate}\nTerminal: ${flight.terminal}\n\nThank you,\n${flight.airline}`;

      const smsBody = `Flight ${flight.flightNumber} update: Status: ${flight.status}, Departure: ${flight.departureTime}, Arrival: ${flight.arrivalTime}, Gate: ${flight.gate}, Terminal: ${flight.terminal}`;

      // Send email and SMS
      await sendEmail(passenger.email, emailSubject, emailBody);
      //await sendSMS(passenger.phone, smsBody);
      // Here we can emit the message to some other service or process it further
    },
  });
};

runConsumer().catch(console.error);

module.exports = consumer;
