const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    signedIn: req.cookies.loggedIn !== undefined,
    username: req.cookies.loggedIn,
  });
});

router.post('/logOut', function(req, res, next) {
  res.cookie('loggedIn', '', {
    maxAge: 1,
    httpOnly: true,
  });

  res.render('index', {
    title: 'Home',
    signedIn: false,
    username: undefined,
  });
});

module.exports = router;
