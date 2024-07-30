const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authMiddleware = async (req, res, next, role = null) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.passenger.findUnique({ where: { email: decoded.email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        if (role && user.role !== role) {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.user = user; // Save user object for further use
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const authAdminMiddleware = (req, res, next) => {
    authMiddleware(req, res, next, 'admin');
};

module.exports = {
    authMiddleware,
    authAdminMiddleware
};