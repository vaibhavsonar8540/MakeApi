
const fs = require("fs");

const userLogger = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.user.username}, Role: ${req.user.role}\n`;

  fs.appendFile("log.txt", logEntry, (err) => {
    if (err) {
      console.error("Failed to log user:", err);
    } else {
      console.log("Login logged successfully.");
    }
  });

  next();
};

module.exports = userLogger;
