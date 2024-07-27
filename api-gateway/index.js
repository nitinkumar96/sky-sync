const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/check-flight-status', async (req, res) => {
  const { pnr, email } = req.body;

  try {
    // Checking if booking exists
    const bookingResponse = await axios.get(`http://localhost:3002/bookings/${pnr}`);
    if (!bookingResponse.data) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = bookingResponse.data;
    // Checking if email matches
    const passengerResponse = await axios.get(`http://localhost:3003/passengers/${booking.passengerId}`);
    if (!passengerResponse.data || passengerResponse.data.email !== email) {
      return res.status(404).json({ error: "Passenger not found or email does not match" });
    }

    // Get flight status
    const flightResponse = await axios.get(`http://localhost:3001/flights/${booking.flightId}`);
    if (!flightResponse.data) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.status(200).json(flightResponse.data);
  } catch (error) {
    if(error.response.status == 404) {
        res.status(404).json({ error: "Not Found" });
    }
    else {
        res.status(500).json({ error: "Internal Server Error" });
    }
    
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
