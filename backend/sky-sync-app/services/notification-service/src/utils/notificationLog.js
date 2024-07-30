const fs = require('fs');
const path = require('path');


function logNotification(type, recipient, message) {
  const logMessage = `
    Notification Type: ${type}
    Sent to: ${recipient}
    Message: ${message}
    `;

  const logFilePath = path.join(__dirname, 'notification.log');

  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

module.exports = { logNotification };