const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sendSms  = require('../utils/smsService');
const sendEmail = require('../utils/emailService');

async function sendNotification(flightData) {
  try {
    const { id, flightNumber, status, departureTime, gate } = flightData;

    const passengers = await prisma.passenger.findMany({
      where: {
        bookings: {
          some: {
            flightId: id,
          },
        },
      },
      include: {
        bookings: true,
      },
    });

    let message;
    let subject = `Flight Status Update for ${flightNumber}`;
    if (status === 'On Time') {
      message = `Your flight ${flightNumber} is on time. Departure gate: ${gate}.`;
    } else if (status === 'Delayed') {
      message = `Your flight ${flightNumber} is delayed. New departure time: ${departureTime}. Departure gate: ${gate}.`;
    } else if (status === 'Cancelled') {
      message = `Your flight ${flightNumber} has been cancelled.`;
    }

    for (const passenger of passengers) {
      if (passenger.smsNotification) {
        await sendSms(passenger.mobile, message);
      }
      if (passenger.emailNotification) {
        sendEmail(passenger.email, subject, message);
      }
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = sendNotification;