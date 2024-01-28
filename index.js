import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sgMail from '@sendgrid/mail';
import { error } from 'console';
const app = express();

const PORT = process.env.PORT;

// Configure sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use((req, res, next) => {
  console.log(`Incoming request for ${req.originalUrl}`);
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure static serving of files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// main endpoint to serve files
app.get('/', (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.sendFile('index.html', { root: 'public' });
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
