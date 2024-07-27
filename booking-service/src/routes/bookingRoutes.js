const express = require('express');
const { createBooking, getBookingByPNR } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.get('/:pnr', getBookingByPNR);

module.exports = router;
