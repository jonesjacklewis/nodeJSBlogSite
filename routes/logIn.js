const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const encryption = require("../private/js/encryption");

var db = new sqlite3.Database("db/blogApp.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

/* GET log in page. */
router.get("/", function (req, res, next) {
  res.render("logIn", { title: "Log In", signedIn: false });
});

router.post("/logIn", function (req, res, next) {
  const requestBody = req.body;

  if ("username" in requestBody && "password" in requestBody) {
    const username = requestBody["username"];
    const password = encryption.encrypt(requestBody["password"]);

    db.get(
      "SELECT username FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, row) => {
        if (err) {
          res.send(
            '<script>window.alert("Invalid credentials, please try again or create a new user");window.location.href = "/";</script>'
          );
        } else {
          if (row) {
            res.cookie("loggedIn", username, {
              maxAge: 86_400_000,
              httpOnly: true,
            });
            res.send("<script>window.location.href='/'</script>");
          } else {
            res.send(
              '<script>window.alert("Invalid credentials, please try again or create a new user");window.location.href = "/";</script>'
            );
          }
        }
      }
    );
  } else {
    res.send(
      '<script>window.alert("A username and password has not been provided. Redirecting...");window.location.href = "/signUp";</script>'
    );
  }
});

router.get("/logIn", function (req, res, next) {
  res.send(
    '<script>window.alert("A username and password has not been provided. Redirecting...");window.location.href = "/signUp";</script>'
  );
});

module.exports = router;
