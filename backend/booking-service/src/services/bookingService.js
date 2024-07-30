const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const { produceMessage } = require('../kafka/producer');
require('dotenv').config();
const prisma = new PrismaClient();

async function createBooking({ flightId, name, email, mobile }) {
  const flightResponse = await axios.get(`http://localhost:3011/flights/${flightId}`);
  
  if (!flightResponse.data) {
    throw new Error("Flight not found");
  }

  let passenger = await prisma.passenger.findUnique({
    where: { email },
  });

  if (!passenger) {
    passenger = await prisma.passenger.create({
      data: {
        name,
        email,
        mobile,
      },
    });
  }

  let pnr;
  let isUnique = false;
  while (!isUnique) {
    pnr = Math.floor(100000 + Math.random() * 900000).toString();
    const existingBooking = await prisma.booking.findUnique({ where: { pnr } });
    if (!existingBooking) {
      isUnique = true;
    }
  }

  const booking = await prisma.booking.create({
    data: {
      passengerId: passenger.id,
      flightId: parseInt(flightId),
      pnr,
    },
  });

  await produceMessage(process.env.KAFKA_TOPIC, {
    booking: {
      flightId: booking.flightId,
      passengerId: booking.passengerId,
      pnr: booking.pnr,
    },
    passenger: {
      name: passenger.name,
      email: passenger.email,
      mobile: passenger.mobile,
    },
  });

  return booking;
}

module.exports = {
  createBooking,
};