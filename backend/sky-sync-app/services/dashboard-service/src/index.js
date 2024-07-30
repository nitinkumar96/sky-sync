const express = require('express');
const dotenv = require('dotenv');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/flights', flightRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Dashboard service running on port ${PORT}`);
});