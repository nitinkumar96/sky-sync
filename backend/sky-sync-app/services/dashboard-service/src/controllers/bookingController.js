const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingByPnr = async (req, res) => {
    const { pnr } = req.params;
    try {
        const booking = await prisma.booking.findUnique({ where: { pnr } });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBookings,
    getBookingByPnr
};