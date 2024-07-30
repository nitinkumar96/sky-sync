const userService = require('./userService');

const login = async (req, res) => {
    const { email } = req.body;
    try {
        const message = await userService.login(email);
        res.status(200).json({ message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const { token, user } = await userService.verifyOTP(email, otp);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    const { email } = req.user;
    try {
        const user = await userService.getUserDetails(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getUserFlights = async (req, res) => {
    const { email } = req.user;
    try {
        const flights = await userService.getUserFlights(email);
        res.status(200).json(flights);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const updateUserPreferences = async (req, res) => {
    const { emailNotification, smsNotification, pushNotification, reminders } = req.body;
    const { email } = req.user;
    try {
        const message = await userService.updateUserPreferences(email, { emailNotification, smsNotification, pushNotification, reminders });
        res.status(200).json({ message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    login,
    verifyOTP,
    getUserDetails,
    getUserFlights,
    updateUserPreferences,
};