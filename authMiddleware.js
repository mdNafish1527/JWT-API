const jwt = require("jsonwebtoken");

const SECRET_KEY = "YOUR_SECRET_KEY_HERE";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden. Invalid or expired token." });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
