const flightService = require('./flightService');

const getAllFlights = async (req, res) => {
    try {
        const flights = await flightService.getAllFlights();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch flight data' });
    }
};

const getFlightByPnr = async (req, res) => {
    const { pnr, email } = req.body;
    try {
        const flight = await flightService.getFlightByPnr(pnr, email);
        res.status(200).json(flight);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getAllFlights,
    getFlightByPnr,
};