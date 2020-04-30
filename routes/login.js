const express = require('express');
const loginController = require('../controllers/c_login');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.user){
    res.redirect('/');
  }
  else{
    res.locals.signedUp = req.flash('success');
    res.locals.loginError = req.flash('error');
    res.render('login');
  }
});

router.post('/', loginController);

module.exports = router;