const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFlights = async (req, res) => {
  console.log("fetching");
  try {
      const response = await axios.get('http://localhost:3002/flights');
      res.status(200).json(response.data);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch flight data' });
  }
};

const getFlightByPnr = async (req, res) => {
  const { pnr, email } = req.body;

  try {
    const bookingResponse = await axios.get(`http://localhost:3002/bookings/${pnr}`);
    if (!bookingResponse.data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookingResponse.data;
    const passengerResponse = await axios.get(`http://localhost:3002/users/${booking.passengerId}`);

    if (!passengerResponse.data || passengerResponse.data.email !== email) {
      return res.status(404).json({ error: 'Passenger not found or email does not match' });
    }

    // Get flight status
    const flightResponse = await axios.get(`http://localhost:3002/flights/${booking.flightId}`);
    if (!flightResponse.data) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    res.status(200).json(flightResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Not Found' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = {
    getAllFlights,
    getFlightByPnr
};