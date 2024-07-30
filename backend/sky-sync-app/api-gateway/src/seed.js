const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const seedAdmin = async () => {
    try {
        const existingAdmin = await prisma.passenger.findUnique({
            where: { email: 'admin@gmail.com' }
        });

        if (existingAdmin) {
            console.log('Admin already exists. Seeding skipped.');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin', 10); 

        const adminUser = await prisma.passenger.create({
            data: {
                id: 0,
                name: 'SkySync Admin',
                email: 'admin@gmail.com', 
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