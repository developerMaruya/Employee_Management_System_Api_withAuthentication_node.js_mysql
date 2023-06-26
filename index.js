const express=require('express')
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// ... other middleware and routes ...

// Start the server
// app.listen(4000, () => {
//   console.log('API server is running on port 4000');
// });

const nodemailer = require('nodemailer');
const pool = require("./db/db.config");


const conn=require('./db/db.config')
const userRouter = require('./routes/userRouter')
const assetRouter=require('./routes/assetsRouter')
// const TokenModule = require("./auth/token");
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/users", assetRouter);
// const checkRole = require("./auth/rolemeddilware");
// const mysql = require('mysql');

///////////////// send mail to all register user/////////////
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '707mauryaji@gmail.com',
      pass:'uuzkqfjzpcgltzmh'
    }
  });
  
  // API endpoint to send leave notification to every registered employee
  app.post('/leave-notification', (req, res) => {
    const message = req.body.message;
    console.log(message);
  
    const query = `
      SELECT email
      FROM registration
    `;
  
    pool.query(query, (err, results) => {
      if (err) {
        throw err;
      }
      results.forEach((result) => {
        console.log(result.email)
        sendEmail(result.email, message);
      });
  
      res.send('notifications sent successfully !!.');
    });
  });
  
  // Function to send email notifications
  function sendEmail(email, message) {
    const mailOptions = {
      from: '707mauryaji@gmail.com',
      to: email,
      subject: 'Leave Notification',
      text: message
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Email sent to ${email}: ${info.response}`);
      }
    });
  }

app.listen(3000,()=>{
    console.log("server run on port 3000")
})