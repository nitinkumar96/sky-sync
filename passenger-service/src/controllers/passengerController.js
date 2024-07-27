const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new passenger
async function createPassenger(req, res) {
  const { name, email, mobile } = req.body;

  try {
    const passenger = await prisma.passenger.create({
      data: {
        name,
        email,
        mobile,
      },
    });
    res.status(201).json(passenger);
  } catch (error) {
    res.status(500).json({ error: "Error creating passenger" });
  }
}

// Get passenger details by ID
async function getPassengerById(req, res) {
  const { id } = req.params;

  try {
    const passenger = await prisma.passenger.findUnique({
      where: { id: parseInt(id) },
    });
    if (!passenger) {
      return res.status(404).json({ error: "Passenger not found" });
    }
    res.status(200).json(passenger);
  } catch (error) {
    res.status(500).json({ error: "Error fetching passenger" });
  }
}

// Get all passengers
async function getAllPassengers(req, res) {
  try {
    const passengers = await prisma.passenger.findMany();
    res.status(200).json(passengers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching passengers" });
  }
}

module.exports = {
  createPassenger,
  getPassengerById,
  getAllPassengers,
};
