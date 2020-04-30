const validator = require('express-validator');
const Secret = require('../models/secrets');
const User = require('../models/users');

module.exports = [
  validator.body('number').escape(),
  (req, res, next) => {
    Secret.findOne({}, (err, doc) => {
      if (err){
        return next(err);
      }
      else{
        if (req.body.number != doc.secret){
          req.flash('error', 'Wrong membership key');
          res.redirect('/membership');
        }
        else{
          User.findOneAndUpdate({username:req.user.username}, {membership:true}, {new:true}, (err, doc) => {
            if (err){
              return next(err);
            }
            else{
              req.flash('membership', "You've gained membership");
              res.redirect('/');
            }
          })
        }
      }
    })
  }
]