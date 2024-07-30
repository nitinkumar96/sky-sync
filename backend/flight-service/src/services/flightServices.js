const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const producer = require('../kafka');

const prisma = new PrismaClient();

async function getFlights() {
  return await prisma.flight.findMany();
}

async function getFlightById(flightId) {
  return await prisma.flight.findUnique({ where: { id: parseInt(flightId) } });
}

async function updateFlightStatus(flightId, updateData) {
  const flight = await prisma.flight.findUnique({ where: { id: parseInt(flightId) } });
  if (!flight) {
    throw new Error('Flight not found');
  }

  const newDepartureTime = updateData.departureTime 
    ? new Date(`${updateData.departureTime}:00.000Z`) 
    : flight.departureTime;
  const newArrivalTime = updateData.arrivalTime 
    ? new Date(`${updateData.arrivalTime}:00.000Z`) 
    : flight.arrivalTime;

  const changesMade = (
    newDepartureTime.getTime() !== flight.departureTime.getTime() ||
    newArrivalTime.getTime() !== flight.arrivalTime.getTime() ||
    updateData.status !== flight.status ||
    updateData.gate !== flight.gate ||
    updateData.terminal !== flight.terminal
  );

  if (!changesMade) {
    throw new Error('No changes made');
  }

  const newStatus = newDepartureTime > flight.scheduledDepartureTime ? 'Delayed' : updateData.status || flight.status;
  const newBoardingTime = new Date(newDepartureTime.getTime() - 45 * 60 * 1000);
  const lastUpdated = new Date();

  const updatedFlight = await prisma.flight.update({
    where: { id: parseInt(flightId) },
    data: {
      departureTime: newDepartureTime,
      arrivalTime: newArrivalTime,
      status: newStatus,
      boardingTime: newBoardingTime,
      lastUpdated,
      gate: updateData.gate,
      terminal: updateData.terminal,
    },
  });

  await producer.send({
    topic: 'flight-updates',
    messages: [
      { value: JSON.stringify({ type: 'status-change', data: updatedFlight }) },
    ],
  });
  
  return updatedFlight;
}

async function addFlight(flightData) {
  const {
    flightNumber,
    airline,
    departureAirportCode,
    departureAirportName,
    arrivalAirportCode,
    arrivalAirportName,
    date,
    departureTime,
    arrivalTime,
    status,
    gate,
    terminal
  } = flightData;

  // Validate required fields
  if (!flightNumber || !airline || !departureAirportCode || !departureAirportName || !arrivalAirportCode || !arrivalAirportName || !date || !departureTime || !arrivalTime || !status) {
    throw new Error('Missing required fields');
  }

  const newFlight = await prisma.flight.create({
    data: {
      flightNumber,
      airline,
      departureAirportCode,
      departureAirportName,
      arrivalAirportCode,
      arrivalAirportName,
      date: new Date(date),
      departureTime: new Date(`${departureTime}:00.000Z`),
      arrivalTime: new Date(`${arrivalTime}:00.000Z`),
      status,
      gate,
      terminal,
      scheduledDepartureTime: new Date(`${departureTime}:00.000Z`),
      scheduledArrivalTime: new Date(`${arrivalTime}:00.000Z`),
      elapsedTime: 0,
      aircraftType: "A320",
      lastUpdated: new Date(),
      boardingTime: new Date(new Date(`${departureTime}:00.000Z`).getTime() - 45 * 60 * 1000),
    },
  });

  await producer.send({
    topic: 'flight-updates',
    messages: [
      { value: JSON.stringify({ type: 'new', data: newFlight }) },
    ],
  });

  return newFlight;
}

module.exports = {
  getFlights,
  getFlightById,
  updateFlightStatus,
  addFlight,
};
