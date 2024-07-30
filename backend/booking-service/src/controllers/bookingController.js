const bookingService = require('../services/bookingService');

async function createBooking(req, res) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating booking" });
  }
}

module.exports = {
  createBooking,
};