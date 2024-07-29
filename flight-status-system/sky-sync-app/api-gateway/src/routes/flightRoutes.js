const express = require('express');
const { getAllFlights, getFlightByPnr } = require('../controllers/flightController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getAllFlights);
router.get('/:pnr', authMiddleware, getFlightByPnr);

module.exports = router;