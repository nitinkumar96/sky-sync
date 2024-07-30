const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
  clientId: 'booking-service',
  brokers: ['localhost:9092'],
});