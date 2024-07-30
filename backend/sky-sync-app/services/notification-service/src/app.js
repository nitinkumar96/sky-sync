const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());
app.use('/notifications', notificationRoutes);

app.listen(port, () => {
  console.log(`Notification Service running on port ${port}`);
});
