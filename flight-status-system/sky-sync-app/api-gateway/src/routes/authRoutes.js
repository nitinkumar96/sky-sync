const express = require('express');
const { signup, login, getUserDetails } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getUserDetails);

module.exports = router;