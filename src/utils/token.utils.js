const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (
  userId,
  expiresIn = process.env.JWT_EXPIRES_IN || "15m"
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

module.exports = { generateToken };
