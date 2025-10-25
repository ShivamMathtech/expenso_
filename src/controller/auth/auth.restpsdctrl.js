const crypto = require("crypto");
const { User } = require("../../models/user.model");
const { generateToken } = require("../../utils/token.utils");
// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
const resetpadctrls = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    // 1️⃣ Hash the token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 2️⃣ Find user with matching token and valid expiry
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // 3️⃣ Set new password
    user.password = password; // hashed automatically in pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // 4️⃣ Optionally, generate JWT token after reset
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Password reset successful",
      token, // optional, so user can be logged in immediately
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.resetpadctrls = resetpadctrls;
