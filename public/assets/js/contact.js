require("dotenv").config();
import { sendMail } from "./nodemailer.js";

const sendMessage = () => {
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const emailAddress = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const error = "";

  if (firstName != "" && lastName != "" && emailAddress != "" && phoneNumber != "" && subject != "" && message != "") {
    const mailOptions = {
      from: emailAddress,
      to: process.env.EMAIL,
      subject: subject,
      text: `Name: ${firstName} ${lastName}
      Email: ${emailAddress}
      Phone: ${phoneNumber}
      Message: ${message}`,
    };
    sendMail(mailOptions);
  } else {
    error = "Please fill out all fields.";
  }

  console.log(firstName, lastName, emailAddress, phoneNumber, subject, message);
};

module.exports = sendMessage;
