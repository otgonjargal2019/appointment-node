const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  const tokenPart = token.split(" ")[1];

  jwt.verify(tokenPart, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken, secretKey };
