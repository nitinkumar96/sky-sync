const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'flight-service',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

connectProducer().catch(console.error);

module.exports = producer;