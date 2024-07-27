const express = require('express');
const router = express.Router();
const { getFlights, getFlightById, updateFlightStatus, addFlight } = require('../controllers/flightController');

router.get('/', getFlights);
router.get('/:flightId', getFlightById);
router.put('/:flightId', updateFlightStatus);
router.post('/', addFlight);  

module.exports = router;
