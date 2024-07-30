const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const { produceMessage } = require('../kafka/producer')

async function createBooking(req, res) {
  const { flightId, name, email, mobile } = req.body;

  try {

    const flightResponse = await axios.get(`http://localhost:3011/flights/${flightId}`);
    if (!flightResponse.data) {
      return res.status(404).json({ error: "Flight not found" });
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

    await produceMessage("booking-updates", {
      booking: {
        flightId: booking.flightId,
        passengerId: booking.passengerId,
        pnr: booking.pnr
      },
      passenger: {
        name: passenger.name,
        email: passenger.email,
        mobile: passenger.mobile,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating booking" });
  }
}

module.exports = {
  createBooking
};
