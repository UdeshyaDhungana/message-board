const validator = require('express-validator');
const User = require('../models/users');
const bcryptjs = require('bcryptjs');


const validate = [
  // Check minimum length
  validator.body('firstname', "First name must have at least 2 characters").trim().isLength({ min: 2 }),
  validator.body('lastname', "Last name must have at least 2 characters").trim().isLength({ min: 2 }),

  validator.body('firstname', "First name must have alphabet letters only").isAlpha(),
  validator.body('lastname', "Last name must have alphabet letters only").isAlpha(),

  validator.body('username', "Username must have at least 5 characters").trim().isLength({ min: 5 }),
  validator.body('username', "Username must have alphanumeric characters only").isAlphanumeric(),
  validator.body('password', "Password must have atleast 8 characters").isLength({ min: 8 }),

  // Check password validity
  validator.body('password2', "Password do not match").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password do not match");
    }
    return value;
  }),

  validator.body('username', "Username is already taken").custom((value) => {
    return User.findOne({ username: value }).then((found) => {
      if (found) {
        return Promise.reject('Username already in use');
      }
    });
  }),

  validator.body('password').escape(),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validator.validationResult(req);
    if (errors.array().length > 0) {
      res.render('signup', {
        errors: errors.array()
      })
    }
    else {
      bcryptjs.hash(req.body.password, 10, (err, hashedPw) => {
        if (err) {
          return next(err);
        }
        new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPw,
          membership: false,
        }).save((error) => {
          if (error) {
            return next(error);
          };
          req.flash('success', 'Account created! Now you may login');
          res.redirect('/login');
        });
      });
    }
  }
];

module.exports = validate;