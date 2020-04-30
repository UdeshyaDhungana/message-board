const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users');
const bcrypt = require('bcryptjs');
module.exports = (passport) => {
  // Use strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({username: username}, (err, user) => {
        if (err){
          return next(err);
        };
        if (!user){
          return done(null, false, {message: "Username or password is incorrect"});
        }
        // Compare password if user is found
        bcrypt.compare(password, user.password, (err, res) => {
          if (res){
            // Password do match, do next
            return done(null, user);
          }
          else{
            // Password do not match!
            return done(null, false, {message: "Username or password is incorrect"});
          }
        })
      })      
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
  // Serialize and deserialize
}

