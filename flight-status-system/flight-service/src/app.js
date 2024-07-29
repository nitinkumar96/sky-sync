const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const flightRoutes = require('./routes/flightRoutes');
const app = express();
const port = process.env.PORT || 3011;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/flights', flightRoutes);

app.listen(port, () => {
  console.log(`Flight Service running on port ${port}`);
});