const fs = require('fs');

const errorLogger = (err, req, res, next) => {
  console.error(err); // Log the error to the console

  const logData = {
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    error: err.stack
  };

  const logString = JSON.stringify(logData) + '\n';

  fs.appendFile('./error.log', logString, (error) => {
    if (error) {
      console.error('Error writing to error log:', error);
    }
  });

  next(err);
};

module.exports = errorLogger;