const { User } = require("../../models/user.model");
const sendMail = require("../../utils/mail.utils");

const forgetpsdctrl = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `You requested a password reset.\n\nPlease click the link below:\n${resetUrl}\n\nIf you did not request this, ignore this email.`;

    await sendMail(user.email, "Password Reset Request", message);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset email" });
  }
};
exports.forgetpsdctrl = forgetpsdctrl;
