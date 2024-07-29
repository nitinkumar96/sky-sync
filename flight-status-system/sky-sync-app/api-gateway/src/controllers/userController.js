const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {
    const { email } = req.body;
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const otp = uuidv4().split('-')[0];
    await prisma.oTP.create({
        data: {
            email,
            otp,
            createdAt: new Date(),
        },
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Failed to send OTP' });
        }
        res.status(200).json({ message: 'OTP sent to your email' });
    });
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const savedOTP = await prisma.oTP.findUnique({ where: { email } });

    if (!savedOTP || savedOTP.otp !== otp) {
        return res.status(401).json({ message: 'Invalid OTP' });
    }

    await prisma.oTP.delete({ where: { email } });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
};

const createNewPassword = async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.passenger.update({
        where: { email },
        data: { password: hashedPassword },
    });
    res.status(200).json({ message: 'Password created successfully' });
};

const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.passenger.update({
        where: { email },
        data: { password: hashedPassword },
    });
    res.status(200).json({ message: 'Password changed successfully' });
};

const getUserDetails = async (req, res) => {
    const { email } = req.user;
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
};

module.exports = {
    login,
    verifyOTP,
    createNewPassword,
    changePassword,
    getUserDetails,
};