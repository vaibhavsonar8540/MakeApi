const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Login First");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(403).send("Invalid token");
  }
};

module.exports = authenticator;
