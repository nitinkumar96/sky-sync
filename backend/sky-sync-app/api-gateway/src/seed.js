const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

const seedAdmin = async () => {
    try {
        const existingAdmin = await prisma.passenger.findUnique({
            where: { email: process.env.ADMIN_EMAIL }
        });

        if (existingAdmin) {
            console.log('Admin already exists. Seeding skipped.');
            return;
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10); 

        const adminUser = await prisma.passenger.create({
            data: {
                id: 0,
                name: 'SkySync Admin',
                email: process.env.ADMIN_EMAIL, 
                mobile: '9876543210',
                password: hashedPassword,
                role: 'admin', 
            },
        });

        console.log('Admin user created:', adminUser);
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
};

seedAdmin();