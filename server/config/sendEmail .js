// nodemailer.js
const nodemailer = require("nodemailer");

module.exports = async (email, subject, emailContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL, // sender email address
        pass: process.env.USER_PASSWORD, // sender password
      },
    });

   

    const info = await transporter.sendMail({
      from: "voltwise.solution.2024@gmail.com",
      to: email,
      subject: subject,
      html: emailContent, // Use html instead of text for formatted email
    });

    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
