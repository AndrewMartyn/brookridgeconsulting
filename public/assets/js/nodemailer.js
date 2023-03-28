require("dotenv").config();

// Set up nodemailer
var transporter = nodemailer.createTransport({
  host: smtpout.secureserver.net,
  secure: true,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendMail = (mailOptions) => {
  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log("Failed to send email");
      console.error(err);
    });
};
