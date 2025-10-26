const { User } = require("../../models/user.model");
const updateUserProfilecontroller = async (req, res) => {
  const userId = req.user.id; // from authMiddleware
  const { name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name: name.trim() } }, // Correct $set with object
      { new: true, runValidators: true } // return updated doc + enforce schema rules
    ).select("-password -__v"); // never send password or version

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.json({
      message: "Name updated successfully",
      profile: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error",
      error,
    });
  }
};

exports.updateUserProfilecontroller = updateUserProfilecontroller;
