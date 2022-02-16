const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();
const encryption = require("../private/js/encryption");

var db = new sqlite3.Database("db/blogApp.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

/* GET sign up page. */
router.get("/", function (req, res, next) {
  res.render("signUp", { title: "Sign Up", signedIn: false });
});

router.post("/signUp", function (req, res, next) {
  const requestBody = req.body;

  if ("username" in requestBody && "password" in requestBody) {
    const username = requestBody["username"];
    const password = encryption.encrypt(requestBody["password"]);

    db.run(
      "INSERT INTO users VALUES (null, ?, ?);",
      [username, password],
      (err) => {
        if (err) {
          res.send(
            `<script>window.alert(${err.message});window.location.href = "/";</script>`
          );
        } else {
          res.send(
            '<script>window.alert("Successfully created user, please log in");window.location.href = "/";</script>'
          );
        }
      }
    );
  } else {
    res.send(
      '<script>window.alert("A username and password has not been provided. Redirecting...");window.location.href = "/signUp";</script>'
    );
  }
});

router.get("/signUp", function (req, res, next) {
  res.send(
    '<script>window.alert("A username and password has not been provided. Redirecting...");window.location.href = "/signUp";</script>'
  );
});

module.exports = router;
