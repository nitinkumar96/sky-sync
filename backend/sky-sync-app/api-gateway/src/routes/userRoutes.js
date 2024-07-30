const express = require('express');
const { login, verifyOTP, createNewPassword, changePassword, getUserDetails, getUserFlights, updateUserPreferences } = require('../controllers/userController');
const {authMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/create-password', authMiddleware, createNewPassword);
router.post('/change-password', authMiddleware, changePassword);
router.get('/details', authMiddleware, getUserDetails);
router.get('/flights', authMiddleware, getUserFlights);
router.put('/preferences', authMiddleware, updateUserPreferences);
module.exports = router;