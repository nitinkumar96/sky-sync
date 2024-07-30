const express = require('express');
const { getAllFlights, getFlightByPnr } = require('../controllers/flightController');

const router = express.Router();

router.get('/', getAllFlights);
router.post('/pnr', getFlightByPnr);

module.exports = router;