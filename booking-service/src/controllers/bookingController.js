const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

async function createBooking(req, res) {
    const { passengerId, flightId, pnr } = req.body;
  
    try {
      const flightResponse = await axios.get(`http://localhost:3001/flights/${flightId}`);
      if (!flightResponse.data) {
        return res.status(404).json({ error: "Flight not found" });
      }

      const passengerResponse = await axios.get(`http://localhost:3003/passengers/${passengerId}`);
      if (!passengerResponse.data) {
        return res.status(404).json({ error: "Passenger not found" });
      }
  
      const booking = await prisma.booking.create({
        data: {
          passengerId,
          flightId,
          pnr,
        },
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: "Error creating booking" });
    }
  }
  

async function getBookingByPNR(req, res) {
  const { pnr } = req.params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { pnr }
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error fetching booking" });
  }
}

module.exports = {
  createBooking,
  getBookingByPNR,
};
