const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await prisma.passenger.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check if the user has the role of admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAdminDetails = async (req, res) => {
    const { email } = req.user;

    try {
        const user = await prisma.passenger.findUnique({ where: { email } });

        if (!user || user.role !== 'admin') {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching admin details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    adminLogin,
    getAdminDetails,
};