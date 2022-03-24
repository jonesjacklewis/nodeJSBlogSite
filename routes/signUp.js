/* eslint-disable linebreak-style */
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// eslint-disable-next-line new-cap
const router = express.Router();
const encryption = require('../private/js/encryption');

const usernamePasswordNotProvided = `<script>
window.alert("A username and password has not been provided. Redirecting...");
window.location.href = "/signUp";
</script>`;

const db = new sqlite3.Database('db/blogApp.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

/* GET sign up page. */
router.get('/', function(req, res, next) {
  res.render('signUp', {title: 'Sign Up', signedIn: false});
});

router.post('/signUp', function(req, res, next) {
  const requestBody = req.body;

  if ('username' in requestBody && 'password' in requestBody) {
    const username = requestBody['username'];
    const password = encryption.encrypt(requestBody['password']);

    db.run(
        'INSERT INTO users VALUES (null, ?, ?);',
        [username, password],
        (err) => {
          if (err) {
            res.send(
                `<script>
                window.alert(
                  "This user may already exists please try again."
                  );
                window.location.href = "/";
                </script>`,
            );
          } else {
            res.send(
                `<script>
                window.alert("Successfully created user, please log in");
                window.location.href = "/";
                </script>`,
            );
          }
        },
    );
  } else {
    res.send(usernamePasswordNotProvided);
  }
});

router.get('/signUp', function(req, res, next) {
  res.send(usernamePasswordNotProvided);
});

module.exports = router;
