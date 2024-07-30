const handleNotification = (req, res) => {
    
    const flight = req.body;
    console.log("Notification request received: ", flight);
    res.status(200).json(flight);
  };
  
module.exports = { handleNotification };
  