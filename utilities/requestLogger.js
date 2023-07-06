const fs = require('fs');

const requestLogger = (req, res, next) => {
  const logData = {
    timestamp: new Date(),
    method: req.method,
    url: req.url
  };

  const logString = JSON.stringify(logData) + '\n';

  fs.appendFile('./requestLogger.log', logString, (error) => {
    if (error) {
      console.error('Error writing to request log:', error);
    }
  });

  next();
};

module.exports = requestLogger;
