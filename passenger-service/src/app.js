const express = require('express');
const bodyParser = require('body-parser');
const passengerRoutes = require('./routes/passengerRoutes');

const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.json());
app.use('/passengers', passengerRoutes);

app.listen(port, () => {
  console.log(`Passenger Service running on port ${port}`);
});
