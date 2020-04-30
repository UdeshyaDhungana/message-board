const express = require('express');
const signupController = require('../controllers/c_signup');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.user){
    res.redirect('/');
  }
  res.render('signup', {errors:null});
});

router.post('/', signupController);

module.exports = router;