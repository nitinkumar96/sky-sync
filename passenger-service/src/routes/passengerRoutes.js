const express = require('express');
const { createPassenger, getPassengerById, getAllPassengers } = require('../controllers/passengerController');

const router = express.Router();

router.post('/', createPassenger);
router.get('/:id', getPassengerById);
router.get('/', getAllPassengers);

module.exports = router;
