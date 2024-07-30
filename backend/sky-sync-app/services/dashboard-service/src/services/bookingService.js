const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBookings = async () => {
    return await prisma.booking.findMany();
};

const getBookingByPnr = async (pnr) => {
    const booking = await prisma.booking.findUnique({ where: { pnr } });
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
};

module.exports = {
    getAllBookings,
    getBookingByPnr,
};