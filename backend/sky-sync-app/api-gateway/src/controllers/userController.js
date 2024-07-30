const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

const login = async (req, res) => {
    const { email } = req.body;
    console.log("Received request for: ", email);
    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
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
            user: 'alanna.stark28@ethereal.email',
            pass: 'CuvBgYrtUynx3cGHX5'
        }
    });

    const mailOptions = {
        from: 'alanna.stark28@ethereal.email',
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
    console.log(email, otp, process.env.JWT_SECRET);
    const savedOTP = await prisma.oTP.findUnique({ where: { email } });

    if (!savedOTP || savedOTP.otp !== otp || (new Date() - savedOTP.createdAt) > 10 * 60 * 1000) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    await prisma.oTP.delete({ where: { email } });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const user = await prisma.passenger.findUnique({ where: { email } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ token, user });
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


const getUserFlights = async (req, res) => {
    const { email } = req.user; 
    console.log(`\nReceived flights request for: ${email}`);
    try {
      const bookings = await prisma.booking.findMany({
        where: {
          passenger: {
            email: email,
          },
        },
        include: {
          flight: true, 
        },
      });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user.' });
      }
      
      console.log(`\nBookings\n`, bookings);
      const flights = bookings.map((booking) => booking.flight);
      console.log(`\Flights\n`, flights);
      res.status(200).json(flights);
    } catch (error) {
      console.error('Error fetching user flights:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const updateUserPreferences = async (req, res) => {
    const { emailNotification, smsNotification, pushNotification, reminders } = req.body;
    const { email } = req.user; 

    const user = await prisma.passenger.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await prisma.passenger.update({
        where: { email },
        data: {
            emailNotification: emailNotification,
            smsNotification: smsNotification,
            pushNotification: pushNotification,
            reminders: reminders,
        },
    });

    res.status(200).json({ message: 'Notification preferences updated successfully' });
};

module.exports = {
    login,
    verifyOTP,
    createNewPassword,
    changePassword,
    getUserDetails,
    getUserFlights,
    updateUserPreferences
};