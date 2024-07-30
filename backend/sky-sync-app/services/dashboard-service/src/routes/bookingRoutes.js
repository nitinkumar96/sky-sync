const express = require('express');
const { getAllBookings, getBookingByPnr } = require('../controllers/bookingController');

const router = express.Router();

router.get('/', getAllBookings);
router.get('/:pnr', getBookingByPnr);

module.exports = router;