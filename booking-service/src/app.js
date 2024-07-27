const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use('/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Booking Service running on port ${port}`);
});
