/* eslint-disable linebreak-style */
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// eslint-disable-next-line new-cap
const router = express.Router();
const encryption = require('../private/js/encryption');

const db = new sqlite3.Database('db/blogApp.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const redirectingScript = `<script>
window.alert("A username and password has not been provided. Redirecting...");
window.location.href = "/signUp";
</script>`;

/* GET log in page. */
router.get('/', function(req, res, next) {
  res.render('logIn', {title: 'Log In', signedIn: false});
});

router.post('/logIn', function(req, res, next) {
  const requestBody = req.body;

  if ('username' in requestBody && 'password' in requestBody) {
    const username = requestBody['username'];
    const password = encryption.encrypt(requestBody['password']);

    db.get(
        'SELECT username FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
          if (err) {
            res.send(redirectingScript);
          } else {
            if (row) {
              res.cookie('loggedIn', username, {
                maxAge: 86_400_000,
                httpOnly: true,
              });
              res.send('<script>window.location.href=\'/\'</script>');
            } else {
              res.send(redirectingScript);
            }
          }
        },
    );
  } else {
    res.send(redirectingScript);
  }
});

router.get('/logIn', function(req, res, next) {
  res.send(redirectingScript);
});

module.exports = router;
