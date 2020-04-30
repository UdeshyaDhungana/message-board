const validator = require('express-validator');
const Message = require('../models/messages');
const mongoose = require('mongoose');

const validate = [
  validator.body('message', "Message cannot be empty").trim().notEmpty(),
  validator.body('message').escape(),

  (req, res, next) => {
    const errors = validator.validationResult(req);
    if (errors.array().length > 0){
      req.flash('error', "Message field cannot be empty");
      res.redirect('/create');
    }
    else{
      new Message({
        msg: req.body.message,
        author: mongoose.Types.ObjectId(req.user._id)
      }).save((error) => {
        if (error){
          return next(error);
        }
        else{
          req.flash('added', 'Message added!');
          res.redirect('/');
        }
      })
    }
  }
  // Make message and save
  
];

module.exports = validate;