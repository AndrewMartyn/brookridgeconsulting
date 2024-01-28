const dotenv = require('dotenv').config();

const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const { fileURLToPath } = require('url');
const { error } = require('console');
const app = express();

const PORT = process.env.PORT;

// Configure sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure static serving of files
app.use(express.static('public'));

// main endpoint to serve files
app.get('/', (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.sendFile('index.html', { root: path.join(__dirname, 'public') });
  response.sendFile('index.html');
});

// contact endpoint
app.post('/contact', (req, res) => {
  const { firstname, lastname, email, phone, message } = req.body;
  const msg = {
    to: process.env.SENDGRID_RECIPIENT,
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: 'Message from BRC Contact Form!',
    text: `Message from ${firstname} ${lastname}\nPhone number: ${phone}\nEmail: ${email}\nMessage:\n${message}`,
  };
  try {
    if (firstname.length > 0 && lastname.length > 0 && email.length > 0 && phone.length > 0 && message.length > 0) {
      sgMail.send(msg);
      console.log(msg);
    } else {
      throw error('invalid message');
    }
    res.redirect('/');
  } catch (error) {
    console.log(msg);
    res.redirect('/');
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Running Server on Port: ${PORT}`);
});
