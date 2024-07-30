const userService = require('./userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
};