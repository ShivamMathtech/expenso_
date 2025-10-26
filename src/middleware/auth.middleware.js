const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded; // Attach user data to request
    next(); // Proceed to next middleware/route
  } catch (error) {
    return res.status(403).json({
      msg: "Token expires",
    });
  }
};

exports.authMiddleware = authMiddleware;
