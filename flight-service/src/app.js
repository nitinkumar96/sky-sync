const express = require('express');
const bodyParser = require('body-parser');
const flightRoutes = require('./routes/flightRoutes');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/flights', flightRoutes);

app.listen(port, () => {
  console.log(`Flight Service running on port ${port}`);
});
