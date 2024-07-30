const { Kafka } = require('kafkajs');
require('dotenv').config();

exports.kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_URL],
});