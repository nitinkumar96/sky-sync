const { Kafka } = require('kafkajs');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();
// const { sendNotification } = require('../services/notificationService');
// const { updateDashboard } = require('../services/dashboardService');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'flight-booking-group' });

const consumeMessages = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'flight-updates', fromBeginning: true });
  await consumer.subscribe({ topic: 'booking-updates', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message);
      const msgValue = message.value.toString();
      const parsedMessage = JSON.parse(msgValue);

      if (topic === 'flight-updates') {
        await handleFlightUpdate(parsedMessage);
      } else if (topic === 'booking-updates') {
        await handleBookingUpdate(parsedMessage);
      }
    }
  });
};

const handleFlightUpdate = async (flightData) => {
  try {
    console.log("\n\nReceived: ", flightData);
    const { type, data } = flightData;
    const id = data.id;

    if (type === 'new') {
      await prisma.flight.upsert({
        where: { id: id },
        update: data,
        create: { id: id, ...data }
      });
      console.log(`New flight data processed: ${id}`);
    } else if (type === 'status-change') {
      await prisma.flight.update({
        where: { id: id },
        data: data
      });
      console.log(`Flight status updated: ${id}`);

      try {
          const response = await axios.post('http://localhost:3003/notifications', data);
      } catch (error) {
          console.log(error);
      }
      // Update the dashboard
      //await updateDashboard(id, data);

      // Send notifications
      //await sendNotification(id, data);
    }
  } catch (error) {
    console.error('Error processing flight update', error);
  }
};

const handleBookingUpdate = async (bookingData) => {
  try {
    console.log("\n\nReceived: ", bookingData);
    const { booking, passenger } = bookingData;
    console.log(booking, passenger);

    const pId = booking.passengerId;
    const upsertUser = await prisma.passenger.upsert({
      where: {
        email: passenger.email,
      },
      update: {
        id: pId,
        name: passenger.name,
        mobile: passenger.mobile
      },
      create: {
        id: pId,
        email:  passenger.email,
        name:  passenger.name,
        mobile:  passenger.mobile
      },
    });

    const bookings = await prisma.booking.create({
      data: booking
    });

    

    console.log(`Booking data processed: ${bookings} and ${upsertUser}`);
  } catch (error) {
    console.error('Error processing booking update', error);
  }
};

module.exports = { consumeMessages };