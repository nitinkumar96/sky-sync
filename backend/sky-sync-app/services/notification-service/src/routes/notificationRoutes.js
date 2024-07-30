const express = require('express');
const router = express.Router();
const { handleNotification } = require('../controllers/notificationController');

router.post('/', handleNotification);

module.exports = router;
