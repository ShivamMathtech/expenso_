const nodemailer = require("nodemailer");
/**
 * Send an email
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Email text content
 * @param {string} [options.html] - Optional HTML content
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // 1️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2️⃣ Email options
    const mailOptions = {
      from: `"Expense Tracker" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    };

    // 3️⃣ Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
