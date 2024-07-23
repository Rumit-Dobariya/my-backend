const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:6022', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));

  app.options('*', cors(corsOptions));

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config(); // Load environment variables from .env file

const emailUsername = "rumitdobariya80499@gmail.com";
const emailPassword = "dlmj mmzu kqay fuxv";

// console.log(emailUsername, emailPassword, "emailUsername, emailPassword");
// Use emailUsername and emailPassword in your nodemailer transporter setup


// Example endpoint to handle POST requests for sending emails
app.post('/api/sendEmail', (req, res) => {
  const { name, email, message } = req.body;

  // Create a nodemailer transporter using your SMTP settings
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });

  // Setup email data
  let mailOptions = {
    from: emailUsername,
    to: 'harshil.19beceg031@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
      res.status(500).send('Failed to send email.');
    } else {
      console.log('Message sent:', info.response);
      res.status(200).send('Message sent successfully.');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
