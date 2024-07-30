const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
    return await prisma.passenger.findMany();
};

const getUserById = async (id) => {
    const user = await prisma.passenger.findUnique({ where: { id: parseInt(id) } });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
};