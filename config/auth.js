
const bcrypt = require('bcrypt');
const { log } = require('console');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let auth = {};

auth.ottp = [];

// Configure Nodemailer to send emails (replace with your own SMTP settings)
auth.transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dhanajayshinde2212@gmail.com',
    pass: 'hoaoytmjzqnqxefc',
  },
});

// Generate random OTP
auth.generateOtp = function (){
  otp = crypto.randomInt(100000, 999999).toString();
  console.log("inside generateOtp function", otp);
  this.ottp.push(otp);
  return otp;
}

// Send OTP to the user's email
auth.sendOTP = function(email, otp) {
    console.log("inside send otp");
  const mailOptions = {
    from: 'dhanajayshinde2212@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

  try {
    auth.transporter.sendMail(mailOptions, (error, info) => {
        console.log("innside send mail");
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  } catch (error) {
    console.log("error is ", error);
  }
}

module.exports = auth;