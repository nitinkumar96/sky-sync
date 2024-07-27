const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getFlights = async (req, res) => {
  try {
    const flights = await prisma.flight.findMany();
    res.json(flights);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await prisma.flight.findUnique({ where: { id: parseInt(flightId) } });
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).send('Flight not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateFlightStatus = async (req, res) => {
  const { flightId } = req.params;
  const { status } = req.body;
  try {
    const updatedFlight = await prisma.flight.update({
      where: { id: parseInt(flightId) },
      data: { status },
    });
    res.json(updatedFlight);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addFlight = async (req, res) => {
    const { flightNumber, status, departureTime, arrivalTime } = req.body;
    try {
      const newFlight = await prisma.flight.create({
        data: {
          flightNumber,
          status,
          departureTime: new Date(departureTime),
          arrivalTime: new Date(arrivalTime),
        },
      });
      res.json(newFlight);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
module.exports = {
  getFlights,
  getFlightById,
  updateFlightStatus,
  addFlight
};
