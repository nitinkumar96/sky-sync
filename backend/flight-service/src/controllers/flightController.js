const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const producer = require('../kafka');

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
  const updateData = req.body;

  console.log(flightId, updateData);
  try {
    const flight = await prisma.flight.findUnique({ where: { id: parseInt(flightId) } });
    if (!flight) {
      return res.status(404).send('Flight not found');
    }

    // Parse the input times as local dates
    const newDepartureTime = updateData.departureTime 
      ? new Date(`${updateData.departureTime}:00.000Z`) 
      : flight.departureTime;
    const newArrivalTime = updateData.arrivalTime 
      ? new Date(`${updateData.arrivalTime}:00.000Z`) 
      : flight.arrivalTime;

    // Check if departure or arrival times are different
    const changesMade = (
      newDepartureTime.getTime() !== flight.departureTime.getTime() ||
      newArrivalTime.getTime() !== flight.arrivalTime.getTime() ||
      updateData.status !== flight.status ||
      updateData.gate !== flight.gate ||
      updateData.terminal !== flight.terminal
    );

    if (!changesMade) {
      return res.status(200).send('No changes made');
    }

    // Calculate new status and boarding time
    const newStatus = newDepartureTime > flight.scheduledDepartureTime ? 'Delayed' : updateData.status || flight.status;
    const newBoardingTime = new Date(newDepartureTime.getTime() - 45 * 60 * 1000);
    const lastUpdated = new Date();

    console.log(updateData, newStatus, newBoardingTime);

    // Update flight
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
    console.log(`Flight Data Sent, Id : ${updatedFlight.id}`);

    res.json(updatedFlight);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).send(error.message);
  }
};

const addFlight = async (req, res) => {
  try {
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
    } = req.body;

    // Validate required fields
    if (!flightNumber || !airline || !departureAirportCode || !departureAirportName || !arrivalAirportCode || !arrivalAirportName || !date || !departureTime || !arrivalTime || !status) {
      return res.status(400).send('Missing required fields');
    }

    // Create new flight
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
        boardingTime: new Date(new Date(`${departureTime}:00.000Z`).getTime() - 45 * 60 * 1000) 
      },
    });

    console.log(newFlight);

    await producer.send({
      topic: 'flight-updates',
      messages: [
          { value: JSON.stringify({ type: 'new', data: newFlight }) },
      ],
    });

    res.json(newFlight);
  } catch (error) {
    console.error('Error creating flight:', error);
    res.status(500).send(error.message);
  }
};
  
module.exports = {
  getFlights,
  getFlightById,
  updateFlightStatus,
  addFlight
};
