var express = require('express');
var router = express.Router();
var Message = require('../models/messages');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Handle if user exists
  res.locals.user = req.user;
  res.locals.membership = req.flash('membership');
  res.locals.messageAddition = req.flash('added');
  // Collect messages and authors
  Message.find({}, (err, docs) => {
    if (err){
      return next(err);
    }
    res.locals.messages = docs;
    res.render('index', { title: 'MESSAGE-BOARD >_' });
  }).populate('author');
});

module.exports = router;
