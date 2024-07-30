const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

const adminLogin = async (email, password) => {
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Admin not found');
    }

    // Check if the user has the role of admin
    if (user.role !== 'admin') {
        throw new Error('Access denied');
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};

const getAdminDetails = async (email) => {
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user || user.role !== 'admin') {
        throw new Error('Admin not found');
    }

    return user;
};

module.exports = {
    adminLogin,
    getAdminDetails,
};