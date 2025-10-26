const { User } = require("../../models/user.model");

const usergetController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    res.status(200).json({
      message: "Profile fetched successfully",
      profile: {
        id: user.id,
        name: user.name,
        enail: user.email,
        // Add more fields as needed
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

exports.usergetController = usergetController;
