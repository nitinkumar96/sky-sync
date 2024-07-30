const adminService = require('./adminService');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await adminService.adminLogin(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getAdminDetails = async (req, res) => {
    const { email } = req.user;
    try {
        const user = await adminService.getAdminDetails(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    adminLogin,
    getAdminDetails,
};