const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
  if (!password) throw new Error("Password is required for hashing");
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  if (!enteredPassword || !hashedPassword) {
    throw new Error(
      "Both enteredPassword and hashedPassword are required for comparison"
    );
  }
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
