const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFlights = async (req, res) => {
    try {
        const flights = await prisma.flight.findMany();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFlightById = async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await prisma.flight.findUnique({ where: { id: parseInt(id) } });
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFlights,
    getFlightById
};