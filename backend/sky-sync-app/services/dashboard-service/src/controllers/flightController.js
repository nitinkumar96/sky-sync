const flightService = require('./flightService');

const getAllFlights = async (req, res) => {
    try {
        const flights = await flightService.getAllFlights();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFlightById = async (req, res) => {
    const { id } = req.params;
    try {
        const flight = await flightService.getFlightById(id);
        res.json(flight);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllFlights,
    getFlightById,
};