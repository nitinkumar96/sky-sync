const sendNotification = require('../services/sendNotification');

const handleNotification = async (req, res) => {
  const flight = req.body;
  console.log("Notification request received: ", flight);
  
  try {
    await sendNotification(flight);
    res.status(200).json({ message: 'Notifications sent successfully.' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ message: 'Failed to send notifications.' });
  }
};

module.exports = { handleNotification };
