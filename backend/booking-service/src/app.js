const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3012;
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Booking Service running on port ${port}`);
});
