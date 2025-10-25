const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_MAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

module.exports = sendMail;
