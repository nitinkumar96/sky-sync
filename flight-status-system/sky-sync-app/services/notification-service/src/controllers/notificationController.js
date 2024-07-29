const handleNotification = (req, res) => {
    res.send('Notification service is running and listening to Kafka messages.');
  };
  
module.exports = { handleNotification };
  