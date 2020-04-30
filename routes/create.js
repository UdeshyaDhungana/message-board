const express = require('express');
const createController = require('../controllers/c_create');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.user){
    res.locals.membershipStatus = req.user.membership;
    res.locals.error = req.flash('error');
    res.render('create');
  }
  else{
    res.redirect('/login');
  }
});

router.post('/', createController);

module.exports = router;