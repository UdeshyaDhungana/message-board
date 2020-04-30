const validator = require('express-validator');
const passport = require('passport');

const validate = [
  // Sanitize form
  validator.body('username', 'Username required').trim().notEmpty(),
  validator.body('password', 'Password required').trim().notEmpty(),

  validator.body('username').escape(),
  validator.body('password').escape(),

  passport.authenticate('local', {
    successRedirect: "/",
    failureFlash: true,
    failureRedirect: "/login",
  })
]

module.exports = validate;