const { consumeMessages } = require('./kafkaConsumer');

const startConsumer = async () => {
  try {
    await consumeMessages();
    console.log('Kafka consumer started successfully');
  } catch (error) {
    console.error('Error starting Kafka consumer', error);
  }
};

startConsumer();