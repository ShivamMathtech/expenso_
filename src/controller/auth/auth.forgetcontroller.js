const { User } = require("../../models/user.model");

const forgetpsdctrl = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;
  const message = `You requested a password reset. Click here to reset: \n\n${resetUrl}`;
  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });
    res.status(200).json({ message: "Reset email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: "Email could not be sent" });
  }
};
exports.forgetpsdctrl = forgetpsdctrl;
