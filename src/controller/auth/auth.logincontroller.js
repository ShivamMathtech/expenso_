const { User } = require("../../models/user.model");
const { comparePassword } = require("../../utils/hash.utils");
const { generateToken } = require("../../utils/token.utils");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }
    // check Email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        msg: "Invalid Credential",
      });
    }
    // check Password
    const isPmatch = await comparePassword(password, user.password);

    if (!isPmatch) {
      return res.status(400).json({
        msg: "Invalid Credential",
      });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.loginController = loginController;
