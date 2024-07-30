const flightService = require('../services/flightService');

const getFlights = async (req, res) => {
  try {
    const flights = await flightService.getFlights();
    res.json(flights);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getFlightById = async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await flightService.getFlightById(flightId);
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

  try {
    const updatedFlight = await flightService.updateFlightStatus(flightId, updateData);
    res.json(updatedFlight);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).send(error.message);
  }
};

const addFlight = async (req, res) => {
  try {
    const newFlight = await flightService.addFlight(req.body);
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
  addFlight,
};