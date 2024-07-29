const express = require('express');
const router = express.Router();
const { handleNotification } = require('../controllers/notificationController');

router.get('/', handleNotification);

module.exports = router;
