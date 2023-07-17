const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../utilities/connection');

 function initialize(passport, getUserByEmail) {
  console.log("hello");
  // const user = await getUserByEmail(email);
  const authenticateUser = async (email, password, done) => {
  const user = await getUserByEmail(email);
  console.log("user found", user);
    if (user == null) {
      return done(null, false, { message: "No user found with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'Email' }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initialize;

