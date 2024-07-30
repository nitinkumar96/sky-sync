const express = require('express');
const { adminLogin, getAdminDetails, } = require('../controllers/adminController');
const {authAdminMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/details', authAdminMiddleware, getAdminDetails);

module.exports = router;