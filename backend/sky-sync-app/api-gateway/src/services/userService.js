const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

const login = async (email) => {
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    const otp = uuidv4().split('-')[0];
    await prisma.oTP.upsert({
        where: { email },
        update: { otp, createdAt: new Date() },
        create: { email, otp, createdAt: new Date() },
    });

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return 'OTP sent to your email';
};

const verifyOTP = async (email, otp) => {
    const savedOTP = await prisma.oTP.findUnique({ where: { email } });

    if (!savedOTP || savedOTP.otp !== otp || (new Date() - savedOTP.createdAt) > 10 * 60 * 1000) {
        throw new Error('Invalid or expired OTP');
    }

    await prisma.oTP.delete({ where: { email } });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    return { token, user };
};

const getUserDetails = async (email) => {
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const getUserFlights = async (email) => {
    const bookings = await prisma.booking.findMany({
        where: { passenger: { email } },
        include: { flight: true },
    });

    if (bookings.length === 0) {
        throw new Error('No bookings found for this user.');
    }

    return bookings.map((booking) => booking.flight);
};

const updateUserPreferences = async (email, preferences) => {
    await prisma.passenger.update({
        where: { email },
        data: preferences,
    });
    return 'Notification preferences updated successfully';
};

module.exports = {
    login,
    verifyOTP,
    getUserDetails,
    getUserFlights,
    updateUserPreferences,
};