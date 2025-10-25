const { User } = require("../../models/user.model");
const { generateToken } = require("../../utils/token.utils");
const { hashPassword } = require("../../utils/hash.utils");
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }
    const userExisted = await User.findOne({ email });
    if (userExisted) {
      return res.status(400).json({
        msg: "User already existed",
      });
    }
    // hashing the password
    const hash = await hashPassword(password);
    const newUser = await User.create({
      name,
      password: hash,
      email,
    });
    // Token genration
    const token = generateToken(newUser._id);
    res.status(201).json({
      msg: "User registered successfully",
      newUser,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.registerController = registerController;
