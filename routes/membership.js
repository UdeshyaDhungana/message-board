const express = require('express');
const membershipController = require('../controllers/c_membership');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.user){
    res.redirect('/login');
  }
  else{
    res.locals.membershipError = req.flash('error');
    res.locals.membershipStatus = req.user.membership;
    res.render('membership');
  }
});

router.post('/', membershipController);

module.exports = router;