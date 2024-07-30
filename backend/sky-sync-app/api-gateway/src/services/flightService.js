const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFlights = async () => {
    const response = await axios.get('http://localhost:3002/flights');
    return response.data;
};

const getFlightByPnr = async (pnr, email) => {
    const bookingResponse = await axios.get(`http://localhost:3002/bookings/${pnr}`);
    if (!bookingResponse.data) {
        throw new Error('Booking not found');
    }

    const booking = bookingResponse.data;
    const passengerResponse = await axios.get(`http://localhost:3002/users/${booking.passengerId}`);

    if (!passengerResponse.data || passengerResponse.data.email !== email) {
        throw new Error('Passenger not found or email does not match');
    }

    // Get flight status
    const flightResponse = await axios.get(`http://localhost:3002/flights/${booking.flightId}`);
    if (!flightResponse.data) {
        throw new Error('Flight not found');
    }

    return flightResponse.data;
};

module.exports = {
    getAllFlights,
    getFlightByPnr,
};