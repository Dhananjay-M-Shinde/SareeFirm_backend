const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../utilities/connection');

// Login route
router.post('/login', (req, res, next) => {
  console.log("into route1");
  passport.authenticate('local', (err, user, info) => {
    console.log("into route2");
    if (err) {
      console.log("into route3");
      return next(err)
    };
    if (!user) {
      console.log("into route4");
      return res.status(401).json({ message: 'Invalid credentials' })
  };
  console.log("into route5");
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    console.log("into route6");
    // Return the token in the response
    return res.json({ token });
  })(req, res, next);
});

module.exports = router;
