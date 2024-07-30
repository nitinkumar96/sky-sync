const bookingService = require('./bookingService');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookingByPnr = async (req, res) => {
    const { pnr } = req.params;
    try {
        const booking = await bookingService.getBookingByPnr(pnr);
        res.json(booking);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllBookings,
    getBookingByPnr,
};