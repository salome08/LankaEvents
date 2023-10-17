const nodemailer = require("nodemailer");

module.exports = {
  sendVerificationCode: async (email, code) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // e.g., 'Gmail'
      auth: {
        user: "lanka.eventapp@gmail.com",
        pass: "laud psau blyj gtls",
      },
    });

    const mailOptions = {
      from: "lanka.eventapp@gmail.com",
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${code}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification code email sent.");
    } catch (error) {
      console.error("Error sending verification code email:", error);
    }
  },
};
