const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_USER, GMAIL_API_KEY, BASE_URL } = process.env;

const nodemailerConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_API_KEY,
  },
};

const sendEmail = async (email, verificationCode) => {
  const transport = nodemailer.createTransport(nodemailerConfig);

  const emailOptions = {
    to: email,
    from: GMAIL_USER,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/users/verify/${verificationCode}">Verify email</a>`,
  };
  try {
    await transport.sendMail(emailOptions);
    console.log("Email sent!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
