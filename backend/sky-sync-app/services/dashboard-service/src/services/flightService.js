const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllFlights = async () => {
    return await prisma.flight.findMany();
};

const getFlightById = async (id) => {
    const flight = await prisma.flight.findUnique({ where: { id: parseInt(id) } });
    if (!flight) {
        throw new Error('Flight not found');
    }
    return flight;
};

module.exports = {
    getAllFlights,
    getFlightById,
};